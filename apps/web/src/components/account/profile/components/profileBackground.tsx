import {
  applyMediaQuery,
  Button,
  Container,
  Wrapper,
} from '@supercarmarket/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useBase64 from 'hooks/queries/useBase64';
import { QUERY_KEYS } from 'http/server/account';
import { type Session } from 'next-auth';
import Skeleton from 'react-loading-skeleton';
import { css } from 'styled-components';
import Image from 'next/image';
import uploadIconSrc from '../../../../../public/images/create.png';
import deleteIconSrc from '../../../../../public/images/delete.png';
import { authRequest } from 'http/core';

const baseSrc =
  'https://user-images.githubusercontent.com/66871265/210207112-a0d7b276-e24b-4ae9-80a1-8e48d5cc45f2.png';

interface ProfileBackgroundProps {
  src: string | null;
  sub: string;
  session: Session | null;
  isMyAccountPage: boolean;
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

      return await authRequest('/server/supercar/v1/user/background', {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.id(sub));
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (url: string) => {
      if (!session) return;

      return await authRequest('/server/supercar/v1/user/background', {
        method: 'DELETE',
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
            sizes={`${applyMediaQuery('desktop')} 100vw, ${applyMediaQuery(
              'mobile'
            )} 425px`}
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
                <Image src={uploadIconSrc} alt="upload" />
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
                  <Image src={deleteIconSrc} alt="delete" />
                </div>
              </Button>
            )}
          </Wrapper.Item>
        )}
      </Wrapper>
    </Container>
  );
};

export default ProfileBackground;
