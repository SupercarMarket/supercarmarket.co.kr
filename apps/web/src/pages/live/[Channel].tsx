import * as React from 'react';
import {
  Container,
  Wrapper,
  applyMediaQuery,
  deviceQuery,
} from '@supercarmarket/ui';
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
import { css } from 'styled-components';
import { useMedia } from '@supercarmarket/hooks';
import { useRecoilState } from 'recoil';
import { layoutPropsRecoil } from 'src/recoil/atom';

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
  const [liveViewCount, setLiveViewCount] = React.useState(0);
  const { isMobile } = useMedia({ deviceQuery });

  const [isFooter, setIsFooter] = useRecoilState(layoutPropsRecoil);

  React.useEffect(() => {
    if (isMobile) {
      setIsFooter({ isFooter: false });
    }
    return () => {
      setIsFooter({ isFooter: true });
    };
  }, [isMobile]);

  if (isLoading || isFetching || !broadCastRoom) return <div>loading..</div>;

  return (
    <Container>
      <Wrapper.Item
        css={css`
          display: flex;
          margintop: 10px;
          ${applyMediaQuery('mobile')} {
            grid-template-columns: 1fr 1fr;
            column-gap: 8px;
            row-gap: 16px;
            width: 100%;
            display: block;
          }
        `}
      >
        {broadCastRoom.data && (
          <>
            <LiveInfo
              data={broadCastRoom.data}
              setIsBroad={setIsBroad}
              isBroad={isBroad}
              liveViewCount={liveViewCount}
            />
            <ChatInfo
              data={broadCastRoom.data}
              isBroad={isBroad}
              setLiveViewCount={setLiveViewCount}
            />
          </>
        )}
      </Wrapper.Item>
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
  liveViewCount: number;
}

const LiveInfo = (props: LiveInfo) => {
  const { data, isBroad, setIsBroad, liveViewCount } = props;

  return (
    <Wrapper.Item
      css={css`
        width: 880px;
        ${applyMediaQuery('mobile')} {
          grid-template-columns: 1fr 1fr;
          column-gap: 8px;
          row-gap: 16px;
          width: 100%;
        }
      `}
    >
      {data ? (
        data.isMine ? (
          <Publisher
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
            liveViewCount={liveViewCount}
          />
        ) : (
          <Subscriber
            sessionId={data.sessionId as string}
            data={data}
            setIsBroad={setIsBroad}
            isBroad={isBroad}
            liveViewCount={liveViewCount}
          />
        )
      ) : (
        <div style={{ backgroundColor: '#000000', height: '495px' }} />
      )}
    </Wrapper.Item>
  );
};
