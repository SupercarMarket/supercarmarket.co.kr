import {
  applyMediaQuery,
  Button,
  Container,
  theme,
  Wrapper,
} from '@supercarmarket/ui';
import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { css } from 'styled-components';
import * as React from 'react';
import { QUERY_KEYS } from 'http/server/account';
import Image from 'next/image';
import clsx from 'clsx';
import uploadIconSrc from '../../../../../public/images/create.png';
import deleteIconSrc from '../../../../../public/images/delete.png';
import { authRequest } from 'http/core';

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

      return await authRequest('/user/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
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

      return await authRequest('/user/gallery', {
        method: 'DELETE',
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
                    <Image src={uploadIconSrc} alt="upload" />
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
                  <Image src={deleteIconSrc} alt="delete" />
                </Button>
              )}
            </div>
          </div>
        </Wrapper.Item>
      )}
    </Wrapper>
  );
};

export default ProfileRepresentative;
