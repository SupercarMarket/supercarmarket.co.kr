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

const Partnership = () => {
  const { data: partnership } = useHome<
    {
      brdSeq: string;
      imgSrc: string;
      category: string;
      title: string;
    }[]
  >('partnership');

  return (
    <Container
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {partnership && (
        <Wrapper
          css={css`
            width: 100%;
            position: relative;
            margin-bottom: 40px;
            ${applyMediaQuery('mobile')} {
              margin-bottom: 16px;
            }
          `}
        >
          <PartnershipArrow direction="left">&lt;</PartnershipArrow>
          <PartnershipArrow direction="right">&gt;</PartnershipArrow>
          <Wrapper.Item
            css={css`
              width: 100%;
              display: flex;
              gap: 20px;
              overflow: hidden;
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
                    height: 180px;
                    flex: none;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    ${applyMediaQuery('mobile')} {
                      width: 167.5px;
                      height: 101px;
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
      )}
      <RouterButton href="/partnership">
        <Typography fontSize="header-16" fontWeight="bold" color="black">
          제휴업체 더보기
        </Typography>
      </RouterButton>
    </Container>
  );
};

export default Partnership;
