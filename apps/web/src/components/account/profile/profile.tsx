import {
  applyMediaQuery,
  Button,
  Container,
  Wrapper,
} from '@supercarmarket/ui';
import { Profile as ProfileType } from '@supercarmarket/types/account';
import Image from 'next/image';
import { css } from 'styled-components';

import * as style from './profile.styled';
import ProfileInfo from './profileInfo';
import useBase64 from 'hooks/queries/useBase64';
import Skeleton from 'react-loading-skeleton';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { clientApi, clientFetcher } from '@supercarmarket/lib';

const baseSrc =
  'https://user-images.githubusercontent.com/66871265/210207112-a0d7b276-e24b-4ae9-80a1-8e48d5cc45f2.png';

export interface ProfileProps {
  isMyAccountPage: boolean;
  sub: string;
  profile: ProfileType;
}

interface ProfileBackgroundProps {
  src: string | null;
  sub: string;
  session: Session | null;
  isMyAccountPage: boolean;
}

interface ProfileRepresentativeProps {
  images?: string[];
}

const ProfileBackground = ({
  src: _src,
  sub,
  session,
  isMyAccountPage,
}: ProfileBackgroundProps) => {
  const src = _src ? _src : baseSrc;
  const { data, isFetching, isLoading } = useBase64(src, {
    category: 'account',
    id: sub,
    detail: true,
    idx: 0,
  });

  const handleBackgroundUpload = async (files: FileList) => {
    if (!session) return;

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append('background', file);
    });

    const response = await clientFetcher(
      '/server/supercar/v1/user/background',
      {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session.accessToken,
        },
        body: formData,
      }
    );

    return response;
  };

  const handleBackgroundRemove = async (url: string) => {
    if (!session) return;
    if (url === baseSrc) return;

    const response = await clientApi('/server/supercar/v1/user/background', {
      method: 'DELETE',
      headers: {
        ACCESS_TOKEN: session.accessToken,
        'Content-Type': 'application/json',
      },
      data: { url },
    });

    return response;
  };

  return (
    <Container position="absolute">
      <Wrapper
        css={css`
          position: relative;
          width: 100%;
          height: 400px;
          ${applyMediaQuery('mobile')} {
            height: 184px;
          }
        `}
      >
        {isFetching || isLoading ? (
          <Wrapper.Item
            css={css`
              .react-loading-skeleton {
                z-index: unset;
                height: 400px;
                ${applyMediaQuery('mobile')} {
                  height: 184px;
                }
              }
            `}
          >
            <Skeleton width="100%" />
          </Wrapper.Item>
        ) : (
          <Image
            src={src}
            alt="background"
            placeholder="blur"
            blurDataURL={data?.data.base64}
            fill
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          />
        )}
        {isMyAccountPage && (
          <Wrapper.Item
            css={css`
              position: absolute;
              display: flex;
              bottom: 24px;
              right: 24px;
              gap: 12px;
              ${applyMediaQuery('mobile')} {
                bottom: 16px;
                right: 16px;
              }
            `}
          >
            <Button type="button" variant="Line">
              <input id="background" type="file" hidden />
              <label htmlFor="background">배경 이미지 수정</label>
            </Button>
            <Button
              type="button"
              variant="Line"
              onClick={() => handleBackgroundRemove(src)}
            >
              삭제
            </Button>
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

const ProfileRepresentative = ({ images }: ProfileRepresentativeProps) => {
  return (
    <Container
      display="grid"
      flex="1"
      gap="20px"
      alignItems="center"
      gridTemplateColumns="1fr 1fr 1fr"
    >
      {images &&
        images.map((image) => (
          <Wrapper
            key={image}
            css={css`
              width: 260px;
              height: 260px;
            `}
          >
            <Image
              src={image}
              alt="대표이미지"
              width={260}
              height={260}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                zIndex: 999,
                borderRadius: '20px',
              }}
            />
          </Wrapper>
        ))}
      {images &&
        Array.from({ length: 3 - images.length }).map((_, index) => (
          <Wrapper
            key={index}
            css={css`
              width: 260px;
              height: 260px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${({ theme }) => theme.color['greyScale-2']};
              border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
              border-radius: 20px;
              z-index: 999;
            `}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_275_10412)">
                <path
                  d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  fill="#8E8E95"
                />
              </g>
              <defs>
                <clipPath id="clip0_275_10412">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Wrapper>
        ))}
    </Container>
  );
};

const Profile = (props: ProfileProps) => {
  const { data } = useSession();
  const { profile, sub, isMyAccountPage, ...rest } = props;
  return (
    <Container position="relative" padding="0 0 80px 0">
      <ProfileBackground
        src={profile.background}
        sub={sub}
        session={data}
        isMyAccountPage={isMyAccountPage}
      />
      <Wrapper css={style.wrapper}>
        <ProfileInfo
          profile={profile}
          sub={sub}
          isMyAccountPage={isMyAccountPage}
          {...rest}
        />
        <ProfileRepresentative images={profile.gallery} />
      </Wrapper>
    </Container>
  );
};

export default Profile;
