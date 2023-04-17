import * as React from 'react';
import { Container } from '@supercarmarket/ui';
import Layout from 'components/layout';
import Publisher from 'components/live/Publisher';
import Subscriber from 'components/live/Subscriber';
import ChatInfo from 'components/live/ChatInfo';
import { useBroadCastRoom } from 'http/server/live/queries';
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from 'next';
import { type NextPageWithLayout } from '@supercarmarket/types/base';

export interface broadContextParm {
  liveViewCount: number;
  setLiveViewCount: React.SetStateAction<number>;
}

const Channel: NextPageWithLayout = ({
  Channel,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    data: broadCastRoom,
    isLoading,
    isFetching,
  } = useBroadCastRoom(Channel);

  const [isBroad, setIsBroad] = React.useState(true);
  const [liveViewCount, setLiveViewCount] = React.useState(
    broadCastRoom?.data.userCount
  );
  if (isLoading || isFetching || !broadCastRoom) return <div>loading..</div>;

  const broadContext = React.createContext({
    liveViewCount,
    setLiveViewCount,
  });

  return (
    <Container>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <broadContext.Provider value={{ liveViewCount, setLiveViewCount }}>
          {broadCastRoom.data && (
            <>
              <LiveInfo
                data={broadCastRoom.data}
                setIsBroad={setIsBroad}
                isBroad={isBroad}
                broadContext={broadContext}
              />
              <ChatInfo
                data={broadCastRoom.data}
                isBroad={isBroad}
                broadContext={broadContext}
              />
            </>
          )}
        </broadContext.Provider>
      </div>
    </Container>
  );
};

Channel.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { Channel } = query;
  return {
    props: {
      Channel,
    },
  };
};

export default Channel;

interface LiveInfo {
  data: Live.LiveRoomDto | null | undefined;
  setIsBroad: (broad: boolean) => void;
  isBroad: boolean;
  broadContext: React.Context<any>;
}

const LiveInfo = (props: LiveInfo) => {
  const { data, isBroad, setIsBroad, broadContext } = props;

  return (
    <div style={{ width: '880px' }}>
      {data ? (
        data.isMine ? (
          <Publisher
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
            broadContext={broadContext}
          />
        ) : (
          <Subscriber
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
            broadContext={broadContext}
          />
        )
      ) : (
        <div style={{ backgroundColor: '#000000', height: '495px' }} />
      )}
    </div>
  );
};
