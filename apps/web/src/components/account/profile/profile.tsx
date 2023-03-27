import * as React from 'react';
import {
  applyMediaQuery,
  Button,
  Container,
  theme,
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
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { QUERY_KEYS, useAccount } from 'http/server/account';

import UploadIcon from '../../../../public/svg/create.svg';
import RemoveIcon from '../../../../public/svg/delete.svg';
import clsx from 'clsx';

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
  session: Session | null;
  sub: string;
  images?: string[];
  isMyAccountPage: boolean;
}

interface ProfileRepresentativeItemProps {
  session: Session | null;
  sub: string;
  queryClient: QueryClient;
  isMyAccountPage: boolean;
  src?: string;
}

const ProfileBackground = ({
  src: _src,
  sub,
  session,
  isMyAccountPage,
}: ProfileBackgroundProps) => {
  const src = _src ? _src : baseSrc;
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading } = useBase64(src, {
    category: 'account',
    id: sub,
    detail: true,
    idx: 0,
  });

  const uploadMutation = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files?.length) return;
      if (!session) return;

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append('background', file);
      });

      e.target.value = '';

      return await clientFetcher('/server/supercar/v1/user/background', {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session.accessToken,
        },
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.id(sub));
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!session) return;

      return await clientApi('/server/supercar/v1/user/background', {
        method: 'DELETE',
        headers: {
          ACCESS_TOKEN: session.accessToken,
          'Content-Type': 'application/json',
        },
        data: { url },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.id(sub));
    },
  });

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
              div {
                padding: 12px;
                display: flex;
                align-items: center;
                gap: 4px;
              }
              label {
                cursor: pointer;
                line-height: 24px;
              }
              svg {
                width: 18px !important;
                height: 18px !important;
                fill: ${theme.color['greyScale-6']} !important;
              }
              button {
                height: 100% !important;
                padding: 0 !important;
              }
              ${applyMediaQuery('mobile')} {
                bottom: 36px;
                right: 16px;
                button {
                  height: 40px !important;
                }
              }
            `}
          >
            <Button type="button" variant="Line">
              <div>
                <input
                  id="background"
                  type="file"
                  accept="image/jpg, image/png, image/jpeg"
                  hidden
                  onChange={(e) => uploadMutation.mutate(e)}
                />
                <label htmlFor="background">배경 이미지 수정</label>
                <UploadIcon />
              </div>
            </Button>
            {src !== baseSrc && (
              <Button
                type="button"
                variant="Line"
                onClick={() => {
                  if (src === baseSrc) return;

                  removeMutation.mutate(src);
                }}
                style={{
                  height: '100%',
                  padding: 0,
                }}
              >
                <div>
                  <label>삭제</label>
                  <RemoveIcon />
                </div>
              </Button>
            )}
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

const ProfileRepresentative = ({
  images,
  session,
  sub,
  isMyAccountPage,
}: ProfileRepresentativeProps) => {
  const queryClient = useQueryClient();
  return (
    <Container display="flex" flex={1}>
      <Wrapper
        css={css`
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
          ${applyMediaQuery('mobile')} {
            overflow-x: scroll;
          }
        `}
      >
        {images &&
          images.map((image) => (
            <ProfileRepresentativeItem
              key={image}
              src={image}
              session={session}
              sub={sub}
              queryClient={queryClient}
              isMyAccountPage={isMyAccountPage}
            />
          ))}
        {images &&
          Array.from({ length: 3 - images.length }).map((_, index) => (
            <ProfileRepresentativeItem
              key={index}
              session={session}
              queryClient={queryClient}
              sub={sub}
              isMyAccountPage={isMyAccountPage}
            />
          ))}
      </Wrapper>
    </Container>
  );
};

const ProfileRepresentativeItem = (props: ProfileRepresentativeItemProps) => {
  const { src, session, sub, queryClient, isMyAccountPage } = props;
  const [hidden, setHidden] = React.useState(true);

  const handleClick = React.useCallback(() => {
    if (!isMyAccountPage) return;
    setHidden((prev) => !prev);
  }, [isMyAccountPage]);

  const uploadMutation = useMutation({
    mutationFn: async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();

      const files = e.target.files;

      if (!files?.length) return;

      Array.from(files).forEach((file) => {
        formData.append('gallery', file);
      });

      e.target.value = '';

      return await clientFetcher('/server/supercar/v1/user/gallery', {
        method: 'POST',
        headers: {
          ACCESS_TOKEN: session?.accessToken || '',
        },
        body: formData,
      });
    },
    onSuccess: () => {
      setHidden(true);
      queryClient.invalidateQueries(QUERY_KEYS.id(sub));
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!session) return;

      return await clientApi('/server/supercar/v1/user/gallery', {
        method: 'DELETE',
        headers: {
          ACCESS_TOKEN: session.accessToken,
          'Content-Type': 'application/json',
        },
        data: { url },
      });
    },
    onSuccess: () => {
      setHidden(true);
      queryClient.invalidateQueries(QUERY_KEYS.id(sub));
    },
  });

  return (
    <Wrapper
      css={
        src
          ? css`
              position: relative;
              width: 260px;
              height: 260px;
              border-radius: 20px;
              overflow: hidden;
              ${applyMediaQuery('mobile')} {
                width: 160px;
                height: 160px;
                border-radius: 12px;
              }
            `
          : css`
              position: relative;
              width: 260px;
              height: 260px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${({ theme }) => theme.color['greyScale-2']};
              border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
              border-radius: 12px;
              overflow: hidden;
              ${applyMediaQuery('mobile')} {
                width: 160px;
                height: 160px;
              }
            `
      }
    >
      {src ? (
        <Image
          src={src}
          alt="대표이미지"
          fill
          style={{
            cursor: isMyAccountPage ? 'pointer' : 'unset',
            objectFit: 'cover',
            borderRadius: '12px',
          }}
          onClick={handleClick}
        />
      ) : (
        <Wrapper.Item
          css={css`
            width: 100%;
            height: 100%;
            div {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: ${isMyAccountPage ? 'pointer' : 'unset'};
              &.hidden {
                display: none;
              }
            }
          `}
          className={clsx({
            hidden: !hidden,
          })}
        >
          <div onClick={handleClick}>
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
          </div>
        </Wrapper.Item>
      )}
      {isMyAccountPage && (
        <Wrapper.Item
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            border-radius: 12px;
            & > div {
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
              width: 100%;
              height: 100%;
              background-color: ${theme.color['greyScale-6']};
              opacity: 0.95;
              z-index: 999;
              cursor: pointer;
              border-radius: 12px;
            }
            div[role='button'] {
              display: flex;
              gap: 12px;
              padding: 12px;
            }
            label {
              cursor: pointer;
              width: 24px;
              height: 24px;
            }
            svg {
              width: 24px !important;
              height: 24px !important;
              fill: ${theme.color['greyScale-6']} !important;
            }
            &.hidden {
              visibility: hidden;
              opacity: 0;
            }
          `}
          className={clsx({
            hidden: hidden,
          })}
        >
          <div
            onClick={(e) => {
              if (e.currentTarget !== e.target) return;
              handleClick();
            }}
          >
            <div role="button">
              {!src && (
                <Button
                  type="button"
                  variant="Line"
                  style={{
                    height: '100%',
                    padding: '10px',
                  }}
                >
                  <input
                    id="representative"
                    type="file"
                    accept="image/jpg, image/png, image/jpeg"
                    hidden
                    onChange={(e) => uploadMutation.mutate(e)}
                  />
                  <label htmlFor="representative">
                    <UploadIcon />
                  </label>
                </Button>
              )}
              {src && (
                <Button
                  type="button"
                  variant="Line"
                  style={{
                    height: '100%',
                    padding: '10px',
                  }}
                  onClick={() => {
                    if (!src) return;
                    removeMutation.mutate(src);
                  }}
                >
                  <RemoveIcon />
                </Button>
              )}
            </div>
          </div>
        </Wrapper.Item>
      )}
    </Wrapper>
  );
};

const Profile = (props: ProfileProps) => {
  const { profile, sub, isMyAccountPage, ...rest } = props;
  const { data: session, status } = useSession();
  const { data: account } = useAccount(sub, session?.accessToken, {
    enabled: status && status !== 'loading',
  });

  return (
    <Container position="relative" padding="0 0 80px 0">
      {account && (
        <>
          <ProfileBackground
            src={account.data.background}
            sub={sub}
            session={session}
            isMyAccountPage={isMyAccountPage}
          />
          <Wrapper css={style.wrapper}>
            <ProfileInfo
              profile={account.data}
              sub={sub}
              isMyAccountPage={isMyAccountPage}
              {...rest}
            />
            <ProfileRepresentative
              isMyAccountPage={isMyAccountPage}
              images={account.data.gallery}
              session={session}
              sub={sub}
            />
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default Profile;
