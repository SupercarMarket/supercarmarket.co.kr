import {
  Alert,
  applyMediaQuery,
  Button,
  Container,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import { Modal } from 'components/common/modal';
import ModalContext from 'feature/modalContext';
import * as React from 'react';
import { css } from 'styled-components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { clientFetcher } from '@supercarmarket/lib';
import { ServerResponse } from '@supercarmarket/types/base';
import { QUERY_KEYS, useMagazineInquiry } from 'http/server/magazine';
import Avatar from 'components/common/avatar';

interface MagazineDealerProps {
  postId: string;
}

const MagazineDealer = ({ postId }: MagazineDealerProps) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const [error, setError] = React.useState<string | null>(null);
  const { onOpen, onClose } = React.useContext(ModalContext);
  const { push } = useRouter();
  const { data: userInfo } = useQuery<ServerResponse<{ phone: string }>>({
    queryKey: ['magazine', 'phone'],
    queryFn: () =>
      clientFetcher('/server/supercar/v1/user/phone', {
        method: 'GET',
        headers: {
          ACCESS_TOKEN: session.data?.accessToken || '',
        },
      }),
    enabled: session.status === 'authenticated',
  });
  const { mutate: inquiryMutation } = useMagazineInquiry(postId, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.id(postId));
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleInquiry = React.useCallback(async () => {
    setError(null);
    onClose();

    if (session.status !== 'authenticated') return;

    inquiryMutation(session.data.accessToken || '');
  }, [inquiryMutation, onClose, session]);

  const onModal = React.useCallback(() => {
    if (session && session.data && userInfo)
      onOpen(
        <Modal
          title="담당자에게 연락처가 전달됩니다"
          description="담당자가 확인 후 연락드리겠습니다"
          clickText="신청하기"
          closeText="취소"
          node={
            <Wrapper
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                background: ${({ theme }) => theme.color['primary-lighten']};
                padding: 10px 22px;
                margin-bottom: 8px;
                border-radius: 4px;
              `}
            >
              <Typography
                as="h4"
                fontSize="header-20"
                fontWeight="bold"
                color="primary-darken"
                lineHeight="150%"
              >
                {userInfo.data.phone}
              </Typography>
            </Wrapper>
          }
          onCancel={() => {
            onClose();
          }}
          onClose={() => {
            onClose();
          }}
          onClick={handleInquiry}
        />
      );
    else
      onOpen(
        <Modal
          description="로그인 후 상담 신청이 가능합니다"
          onCancel={() => {
            onClose();
          }}
          onClose={() =>
            onClose(() => {
              push('/auth/signin');
            })
          }
          onClick={() =>
            onClose(() => {
              push('/auth/signup');
            })
          }
          closeText="로그인"
          clickText="회원가입"
        />
      );
  }, [handleInquiry, onClose, onOpen, push, session, userInfo]);

  return (
    <>
      <Container border="1px solid #EAEAEC" borderRadius="4px">
        <Wrapper
          css={css`
            display: flex;
            justify-content: space-between;
            padding: 30px 40px;
            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              justify-content: unset;
              gap: 18.5px;
              padding: 16px;
            }
          `}
        >
          <Wrapper.Left
            css={css`
              display: flex;
              align-items: center;
              gap: 40px;
              ${applyMediaQuery('mobile')} {
                gap: 16px;
              }
            `}
          >
            <Wrapper.Item>
              <Avatar
                rating="6"
                size={80}
                option={{
                  mobile: '40',
                }}
              />
            </Wrapper.Item>
            <Wrapper.Item
              css={css`
                display: flex;
                flex-direction: column;
                gap: 6px;
                ${applyMediaQuery('mobile')} {
                  gap: 4px;
                  & > h4 {
                    font-size: ${({ theme }) =>
                      theme.fontSize['header-16']} !important;
                  }
                  & > span {
                    font-size: ${({ theme }) =>
                      theme.fontSize['body-12']} !important;
                  }
                }
              `}
            >
              <Typography
                as="h4"
                fontSize="header-24"
                fontWeight="bold"
                lineHeight="150%"
                color="greyScale-6"
                space
              >
                금기사 금종선
              </Typography>
              <Typography
                as="span"
                fontSize="body-16"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-5"
                space
              >
                금기사 금종선입니다!
              </Typography>
            </Wrapper.Item>
          </Wrapper.Left>
          <Wrapper.Right
            css={css`
              display: flex;
              align-items: center;
              gap: 40px;
              ${applyMediaQuery('mobile')} {
                justify-content: space-between;
                & > p {
                  font-size: ${({ theme }) =>
                    theme.fontSize['body-12']} !important;
                }
              }
            `}
          >
            <Typography
              as="p"
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
              space
            >{`더 자세한 정보를 원하신다면\n언제든지 문의 주세요.`}</Typography>
            <Button variant="Primary" onClick={onModal}>
              상담 신청
            </Button>
          </Wrapper.Right>
        </Wrapper>
      </Container>
      {error && <Alert severity="error" title={error} />}
    </>
  );
};

export default MagazineDealer;
