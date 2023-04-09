import React, { useContext, useEffect, useRef, useState } from 'react';
import liveCss from 'public/css/live.module.css';
import { Client, StompSubscription } from '@stomp/stompjs';
import { Button } from '@supercarmarket/ui';
import { getSession } from 'next-auth/react';

interface Props {
  data: channelResType | null | undefined;
  isBroad: boolean;
}

interface channelResType {
  broadCastSeq: number;
  isMine: boolean;
  sessionId: string;
  tags: string[];
  title: string;
  userCount: number;
  userName: string;
  userSeq: number;
}

interface messageType {
  type: string;
  sender: string;
  channelid: string;
  data: string;
}

function ChatInfo(props: Props) {
  const { isBroad } = props;
  const [chats, setChats] = useState<messageType[]>([]);
  const [stomp, setStomp] = useState<Client>();
  const [subscribes, setSubscribes] = useState<StompSubscription>();
  const [testName, setTestName] = useState(`test_${Math.random()}`);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatWrapRef = useRef<HTMLDivElement>(null);

  const joinChat = async () => {
    const session = await getSession();

    if (!session?.accessToken) throw 'require logged in';

    setTestName(session.nickname);

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
          setChats((prevState: messageType[]) => {
            return prevState.concat([getMessage]);
          });
          setTimeout(() => {
            if (chatWrapRef.current) {
              chatWrapRef.current.scrollTop = chatWrapRef.current.scrollHeight;
            }
          }, 100);
        }
      );

      setSubscribes(subscribe);

      client.publish({
        destination: `/sub/${props.data?.sessionId}`,
        body: `{
          "type": "ENTER",
          "sender": "${testName}",
          "channelid": "${props.data?.sessionId}",
          "data": "'${testName}' 님이 접속하셨습니다."
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
        destination: `/sub/${props.data?.sessionId}`,
        body: `{
        "type": "TALK",
        "sender": "${testName}",
        "channelid": "${props.data?.sessionId}",
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
        destination: `/sub/${props.data?.sessionId}`,
        body: `{
            "type": "EXIT",
            "sender": "${testName}",
            "channelid": "${props.data?.sessionId}",
            "data": "'${testName}' 님이 종료하셨습니다."
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

  const test = async () => {
    const session = await getSession();
    console.log(session);
  };

  useEffect(() => {
    joinChat();
    test();
    return () => {
      if (stomp) {
        stomp.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (!isBroad) {
      exitChat();
    }
  }, [isBroad]);

  useEffect(() => {
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
    <div
      style={{
        marginLeft: '16px',
        width: '304px',
      }}
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
          if (data.sender === testName) {
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
      <div
        style={{
          padding: '12px 16px',
          border: '1px solid #C3C3C7',
          display: 'flex',
          borderRadius: '4px',
          height: '97px',
          alignItems: 'flex-end',
        }}
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
      </div>
    </div>
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
