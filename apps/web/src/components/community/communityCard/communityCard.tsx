import Link from 'next/link';
import { Container, Divider, Typography, Wrapper } from '@supercarmarket/ui';
import type { CommunityDto } from '@supercarmarket/types/community';
import type { WithBlurredImage } from '@supercarmarket/types/magazine';
import Avvvatars from 'avvvatars-react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface CommunityCardProps extends WithBlurredImage<CommunityDto> {
  variant: string;
}

type CommunityCardChildrenProps = Omit<CommunityCardProps, 'variant'>;

export const formatter = (category: string) => {
  if (category === 'report') return '제보';
  if (category === 'gallery') return '포토갤러리';
  if (category === 'boast') return '내 차 자랑';
  return '차량 정보';
};

const getCategoryPathname = (category: string) => {
  if (category === 'information') return `/community/library/${category}`;
  return `/community/paparazzi/${category}`;
};

const CommunityCard = ({ variant, ...rest }: CommunityCardProps) => {
  return (
    <>
      {
        {
          column: <CommunityCardColumn {...rest} />,
          row: <CommunityCardRow {...rest} />,
        }[variant]
      }
    </>
  );
};

const CommunityCardRow = (props: CommunityCardChildrenProps) => {
  const {
    id,
    title,
    category,
    like,
    popular,
    comments,
    nickname,
    imgSrc,
    view,
    created,
  } = props;

  return (
    <Link
      href={{
        pathname: `${getCategoryPathname(category)}/${id}`,
      }}
    >
      <Container display="flex" alignItems="center">
        <Wrapper.Left
          css={css`
            width: 760px;
            flex: 1;
            display: flex;
            align-items: center;
            gap: 30px;
          `}
        >
          <Image
            src={
              imgSrc ||
              'https://user-images.githubusercontent.com/66871265/210489106-611e72ee-94f8-49e8-9faa-60f9f20ae50f.png'
            }
            alt="thumbnail"
            width={196}
            height={124}
            style={{ borderRadius: '4px' }}
          />
          <Wrapper.Item
            css={css`
              display: flex;
              align-items: center;
              justify-content: flex-start;
              gap: 12px;
            `}
          >
            {popular && (
              <Typography
                as="b"
                fontSize="header-16"
                fontWeight="bold"
                color="system-1"
                lineHeight="120%"
              >
                인기
              </Typography>
            )}
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-5"
              lineHeight="150%"
            >
              [{formatter(category)}]
            </Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
              style={{
                flex: '1',
              }}
            >
              {title}
            </Typography>
            <Typography
              as="span"
              fontSize="body-16"
              fontWeight="regular"
              color="system-1"
              lineHeight="150%"
            >
              ({comments})
            </Typography>
          </Wrapper.Item>
        </Wrapper.Left>
        <Wrapper.Right
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Wrapper.Item
            css={css`
              display: flex;
              width: 200px;
              align-items: center;
              justify-content: center;
              gap: 8px;
            `}
          >
            <Avvvatars size={40} value={nickname} />
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              {nickname}
            </Typography>
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              & > span {
                width: 80px;
                text-align: center;
              }
            `}
          >
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              {dayjs(created).format('hh:ss')}
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              {view}
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              color="greyScale-6"
              lineHeight="150%"
            >
              {like}
            </Typography>
          </Wrapper.Item>
        </Wrapper.Right>
      </Container>
      <Divider color="#EAEAEC" width="100%" height="1px" margin="6px 0" />
    </Link>
  );
};

const CommunityCardColumn = (props: CommunityCardChildrenProps) => {
  const { id, imgSrc, base64, category, profileSrc, nickname, title } = props;
  return (
    <Link
      href={{
        pathname: `${getCategoryPathname(category)}/${id}`,
      }}
    >
      <Container>
        <Wrapper.Item
          css={css`
            position: relative;
            width: 285px;
            height: 180px;
            ${applyMediaQuery('mobile')} {
              width: 178px;
              height: 120px;
            }
          `}
        >
          <Image
            src={imgSrc}
            alt="thumbnail"
            fill
            placeholder={base64 ? 'blur' : undefined}
            blurDataURL={base64 ? base64 : undefined}
          />
        </Wrapper.Item>
        <Wrapper.Item
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 20px;
          `}
        >
          {profileSrc ? (
            <Image
              src={profileSrc}
              alt="profile"
              width={24}
              height={24}
              style={{
                borderRadius: '12px',
              }}
            />
          ) : (
            <Avvvatars value={nickname} size={24} radius={12} />
          )}
          <Typography
            as="span"
            fontSize="body-16"
            fontWeight="regular"
            color="greyScale-6"
          >
            {nickname}
          </Typography>
        </Wrapper.Item>
        <Wrapper
          css={css`
            margin-top: 10px;
          `}
        >
          <Typography
            as="h2"
            fontSize="header-16"
            fontWeight="bold"
            color="greyScale-6"
          >
            {title}
          </Typography>
          <Typography
            as="h2"
            fontSize="header-16"
            fontWeight="bold"
            color="system-1"
          />
        </Wrapper>
      </Container>
    </Link>
  );
};

export default CommunityCard;
