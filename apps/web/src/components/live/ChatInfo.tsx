import * as React from 'react';
import liveCss from 'public/css/live.module.css';
import { Client, StompSubscription } from '@stomp/stompjs';
import { Button, Wrapper } from '@supercarmarket/ui';
import { getSession, useSession } from 'next-auth/react';
import { css } from 'styled-components';

interface Props {
  data: Live.LiveRoomDto | null | undefined;
  isBroad: boolean;
  broadContext: React.Context<broadContextProps>;
}

interface broadContextProps {
  liveViewCount: number | undefined;
  setLiveViewCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface messageType {
  type: string;
  sender: string;
  channelId: string;
  data: string;
}

function ChatInfo(props: Props) {
  const { isBroad, broadContext } = props;
  const [chats, setChats] = React.useState<messageType[]>([]);
  const [stomp, setStomp] = React.useState<Client>();
  const [subscribes, setSubscribes] = React.useState<StompSubscription>();
  const [userName, setUserName] = React.useState('');

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const chatWrapRef = React.useRef<HTMLDivElement>(null);

  const broadContext_ = React.useContext(broadContext);
  const joinChat = async () => {
    const session = await getSession();

    if (!session?.accessToken) throw 'require logged in';
    setUserName(session.nickname);

    const client = new Client({
      brokerURL: `wss://back.doyup.shop/ws`,
      connectHeaders: {
        ACCESS_TOKEN: `${session.accessToken}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    setStomp(client);

    client.onConnect = function (frame) {
      const subscribe = client.subscribe(
        `/sub/${props.data?.sessionId}`,
        (frame) => {
          const getMessage = JSON.parse(frame.body);
          if (getMessage.type === 'COUNT') {
            broadContext_.setLiveViewCount((privState) => {
              return parseInt(getMessage.participantNumber);
            });
          } else {
            setChats((prevState: messageType[]) => {
              return prevState.concat([getMessage]);
            });
          }
          setTimeout(() => {
            if (chatWrapRef.current) {
              chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
            }
          }, 100);
        }
      );

      setSubscribes(subscribe);

      client.publish({
        destination: `/pub/chat/${props.data?.sessionId}`,
        body: `{
          "type": "ENTER",
          "sender": "${session.nickname}",
          "channelId": "${props.data?.sessionId}",
          "data": "'${session.nickname}' 님이 접속하셨습니다."
        }`,
      });
    };

    client.onStompError = function (frame) {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    client.activate();
  };

  const sendChat = () => {
    if (stomp && textAreaRef.current && textAreaRef.current.value.length > 0) {
      stomp.publish({
        destination: `/pub/chat/${props.data?.sessionId}`,
        body: `{
        "type": "TALK",
        "sender": "${userName}",
        "channelId": "${props.data?.sessionId}",
        "data": "${
          textAreaRef.current?.value.replaceAll(/(\n|\r\n)/g, '<br>') ?? ''
        }"
      }`,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
    if (textAreaRef.current) textAreaRef.current.value = '';
    setTimeout(() => {
      if (chatWrapRef.current) {
        chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
      }
    }, 100);
  };

  const exitChat = () => {
    if (stomp) {
      stomp.publish({
        destination: `/pub/chat/${props.data?.sessionId}`,
        body: `{
            "type": "EXIT",
            "sender": "${userName}",
            "channelId": "${props.data?.sessionId}",
            "data": "'${userName}' 님이 종료하셨습니다."
          }`,
      });
    }
    setTimeout(() => {
      if (chatWrapRef.current) {
        chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
      }
      stomp?.deactivate();
    }, 100);
  };

  React.useEffect(() => {
    joinChat();
  }, []);

  React.useEffect(() => {
    if (!isBroad) {
      exitChat();
    }
  }, [isBroad]);

  React.useEffect(() => {
    if (stomp) {
      textAreaRef.current?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          sendChat();
        }
      });
    }
    return () => {
      if (stomp) {
        stomp.deactivate();
      }
    };
  }, [stomp]);
  return (
    <Wrapper.Item
      css={css`
        margin-left: 16px;
        width: 304px;
      `}
    >
      <div
        style={{
          height: '500px',
          overflowY: 'auto',
        }}
        ref={chatWrapRef}
      >
        {chats.map((data, idx) => {
          if (data.type === 'ENTER' || data.type === 'EXIT') {
            return (
              <InitUserChat chat={data.data} key={`InitUserChat_${idx}`} />
            );
          }
          if (data.sender === userName) {
            return <MyChat chat={data.data} key={`MyChat_${idx}`} />;
          }
          return (
            <UserChat
              nickname={data.sender}
              chat={data.data}
              key={`UserChat_${idx}`}
            />
          );
        })}
      </div>
      <Wrapper.Item
        css={css`
           {
            padding: 12px 16px;
            border: 1px solid #c3c3c7;
            display: flex;
            border-radius: 4px;
            height: 97px;
            align-items: flex-end;
          }
        `}
      >
        <textarea
          placeholder="채팅을 남겨보세요"
          className={liveCss.chatTextarea}
          maxLength={100}
          ref={textAreaRef}
        />
        <Button
          style={{
            width: '72px',
            height: '38px',
          }}
          onClick={sendChat}
        >
          등록
        </Button>
      </Wrapper.Item>
    </Wrapper.Item>
  );
}

const UserChat = ({ nickname, chat }: { nickname: string; chat: string }) => {
  return (
    <div
      style={{
        backgroundColor: '#F7F7F8',
        borderRadius: '4px 16px 16px 16px',
        padding: '12px 16px',
        gap: '8px',
        marginBottom: '10px',
        width: 'fit-content',
      }}
    >
      <span style={{ fontSize: '14px', lineHeight: '150%' }}>{nickname}</span>{' '}
      <span dangerouslySetInnerHTML={{ __html: chat }} />
    </div>
  );
};

const MyChat = ({ chat }: { chat: string }) => {
  return (
    <div
      style={{
        backgroundColor: '#EBE6DE',
        borderRadius: '16px 4px 16px 16px',
        padding: '12px 16px',
        gap: '8px',
        marginBottom: '10px',
        marginLeft: 'auto',
        width: 'fit-content',
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: chat }} />
    </div>
  );
};

const InitUserChat = ({ chat }: { chat: string }) => {
  return (
    <div
      style={{
        borderRadius: '16px 4px 16px 16px',
        padding: '12px 16px',
        gap: '8px',
        marginBottom: '10px',
        fontSize: '14px',
      }}
    >
      {chat}
    </div>
  );
};

export default ChatInfo;
