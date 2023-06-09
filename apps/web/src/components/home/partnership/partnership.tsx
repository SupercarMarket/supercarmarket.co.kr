import * as React from 'react';
import {
  applyMediaQuery,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { useHome } from 'http/server/home';
import Image from 'next/image';
import Link from 'next/link';
import { css } from 'styled-components';
import RouterButton from '../routerButton';
import PartnershipArrow from './components/partnershipArrow';
import { CardSkeleton } from 'components/fallback/loading';

interface PartnershipProps {
  isMobile?: boolean;
}

const Partnership = ({ isMobile }: PartnershipProps) => {
  const pageSize = isMobile ? 2 : 4;
  const {
    data: partnership,
    isLoading,
    isFetching,
  } = useHome<
    {
      brdSeq: string;
      imgSrc: string;
      category: string;
      title: string;
    }[]
  >('partnership');
  const [index, setIndex] = React.useState(0);

  const handleClick = React.useCallback(
    (direction: 'left' | 'right') => {
      if (!partnership || !partnership.data.length) return;

      const size = partnership.data.length;
      const maxIndex = Math.floor(size / pageSize);
      const minIndex = 0;

      if (direction === 'left') {
        if (index === minIndex) return;
        setIndex((prev) => prev - 1);
      }

      if (direction === 'right') {
        if (index === maxIndex) return;
        setIndex((prev) => prev + 1);
      }
    },
    [index, pageSize, partnership]
  );

  if (isLoading || isFetching)
    return <CardSkeleton variant="column" size={4} />;

  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper
        css={css`
          width: 100%;
          position: relative;
        `}
      >
        {partnership && (
          <>
            <PartnershipArrow
              direction="left"
              disabled={index === 0}
              onClick={() => handleClick('left')}
            >
              &lt;
            </PartnershipArrow>
            <PartnershipArrow
              direction="right"
              disabled={
                index === Math.floor(partnership.data.length / pageSize)
              }
              onClick={() => handleClick('right')}
            >
              &gt;
            </PartnershipArrow>
            <Wrapper
              css={css`
                width: 100%;
                position: relative;
                margin-bottom: 40px;
                overflow: hidden;
                ${applyMediaQuery('mobile')} {
                  margin-bottom: 16px;
                }
              `}
            >
              <Wrapper.Item
                css={css`
                  width: 100%;
                  display: flex;
                  gap: 20px;
                  transition: all 0.3s ease-out;
                  ${`transform: translateX(-${index * 101.5}%);`}
                  ${applyMediaQuery('mobile')} {
                    overflow-x: scroll;
                  }
                `}
              >
                {partnership.data.map((p) => (
                  <Link
                    key={p.brdSeq}
                    href={`/partnership/${p.category}/${p.brdSeq}`}
                    style={{
                      flex: 'none',
                    }}
                  >
                    <Wrapper.Item
                      css={css`
                        width: 285px;
                        flex: none;
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                        ${applyMediaQuery('mobile')} {
                          width: 220px;
                          height: 139px;
                          gap: 8px;
                        }
                      `}
                    >
                      <Wrapper.Top
                        css={css`
                          position: relative;
                          width: 100%;
                          height: 180px;
                        `}
                      >
                        <Image
                          src={p.imgSrc}
                          alt="제휴업체"
                          fill
                          style={{
                            borderRadius: '4px',
                            minHeight: '180px',
                          }}
                          sizes={`${applyMediaQuery(
                            'desktop'
                          )} 285px, ${applyMediaQuery('mobile')} 167.5px`}
                        />
                      </Wrapper.Top>
                      <Wrapper.Bottom>
                        <Typography
                          as="b"
                          fontSize="header-16"
                          fontWeight="bold"
                          lineHeight="120%"
                        >
                          {p.title}
                        </Typography>
                      </Wrapper.Bottom>
                    </Wrapper.Item>
                  </Link>
                ))}
              </Wrapper.Item>
            </Wrapper>
          </>
        )}
      </Wrapper>
      <RouterButton href="/partnership">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          제휴업체
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Partnership;
