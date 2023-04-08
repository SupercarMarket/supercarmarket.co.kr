import { createExternalLink } from '@supercarmarket/lib';
import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { useAdvertisement } from 'http/server/home';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { css } from 'styled-components';

interface AdvertisementProps {
  code: string;
  hidden?: boolean;
  isMobile?: boolean;
}

const Advertisement = (props: AdvertisementProps) => {
  const { code, isMobile, hidden = false } = props;
  const {
    data: ad,
    isLoading,
    isFetching,
  } = useAdvertisement(
    {
      type: isMobile ? 'M' : 'D',
      code,
    },
    {
      staleTime: 1000 * 60,
      cacheTime: 1000 * 60,
    }
  );

  return (
    <Container position="relative">
      {!hidden && (
        <Wrapper.Item
          css={css`
            width: 100%;
            margin-top: 8px;
            margin-bottom: 40px;
            div {
              width: 100%;
              height: 180px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${({ theme }) => theme.color['greyScale-3']};
            }
            .react-loading-skeleton {
              width: 100%;
              height: 180px;
            }
            ${applyMediaQuery('mobile')} {
              margin-top: 0;
              margin-bottom: 32px;
              div {
                width: 100vw;
                margin-left: calc(-50vw + 50%);
                height: 100px;
              }
              .react-loading-skeleton {
                width: 100vw;
                margin-left: calc(-50vw + 50%);
                height: 100px;
                height: 180px;
              }
            }
          `}
        >
          {isFetching || isLoading ? (
            <Skeleton />
          ) : ad ? (
            <a
              href={createExternalLink(ad.data[0].url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <Image src={ad.data[0].imageUrl} alt="ad_m" fill />
              </div>
            </a>
          ) : (
            <Skeleton />
          )}
        </Wrapper.Item>
      )}
      <Wrapper.Left
        css={css`
          position: absolute;
          width: 168px;
          height: 590px;
          left: -200px;
          top: 0;
          div {
            width: 100%;
            height: 100%;
            background-color: ${({ theme }) => theme.color['greyScale-3']};
          }
          .react-loading-skeleton {
            width: 100%;
            height: 100%;
          }
          ${applyMediaQuery('mobile')} {
            display: none;
            .react-loading-skeleton {
              display: none;
            }
          }
        `}
      >
        {isFetching || isLoading ? (
          <Skeleton />
        ) : ad ? (
          <a
            href={createExternalLink(ad.data[2].url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <Image src={ad.data[2].imageUrl} alt="ad_l" fill />
            </div>
          </a>
        ) : (
          <Skeleton />
        )}
      </Wrapper.Left>
      <Wrapper.Right
        css={css`
          position: absolute;
          width: 168px;
          height: 590px;
          right: -200px;
          top: 0;
          div {
            width: 100%;
            height: 100%;
            background-color: ${({ theme }) => theme.color['greyScale-3']};
          }
          .react-loading-skeleton {
            width: 100%;
            height: 100%;
          }
          ${applyMediaQuery('mobile')} {
            display: none;
            .react-loading-skeleton {
              display: none;
            }
          }
        `}
      >
        {isFetching || isLoading ? (
          <Skeleton />
        ) : ad ? (
          <a
            href={createExternalLink(ad.data[1].url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <Image src={ad.data[1].imageUrl} alt="ad_r" fill />
            </div>
          </a>
        ) : (
          <Skeleton />
        )}
      </Wrapper.Right>
    </Container>
  );
};

export default Advertisement;
