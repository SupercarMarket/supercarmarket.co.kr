import * as React from 'react';
import { Button, Container, Typography, Wrapper } from '@supercarmarket/ui';
import Link from 'next/link';
import * as style from './footer.styled';
import { ModalContext } from 'feature/ModalProvider';
import TermModal from 'components/common/modal/termModal';
import appStoreSrc from '../../../../public/images/appstore.png';
import playStoreSrc from '../../../../public/images/playstore.png';
import Image from 'next/image';
import AppStoreModal from 'components/common/modal/appStoreModal';

const Footer = () => {
  const { onOpen, onClose } = React.useContext(ModalContext);

  const handleServiceModal = React.useCallback(() => {
    onOpen(
      <TermModal title="이용약관" htmlFor="service" onClose={() => onClose()} />
    );
  }, [onClose, onOpen]);

  const handlePrivacyModal = React.useCallback(() => {
    onOpen(
      <TermModal
        title="개인정보처리방침"
        htmlFor="privacy"
        onClose={() => onClose()}
      />
    );
  }, [onClose, onOpen]);

  const handleAppStoreModal = React.useCallback(() => {
    onOpen(<AppStoreModal onClose={() => onClose()} />);
  }, [onClose, onOpen]);
  return (
    <Container as="footer" role="contentinfo" background="#F7F7F8">
      <Wrapper css={style.footer}>
        <Wrapper.Left css={style.footerLeft}>
          <Wrapper.Item css={style.footerLeftItem}>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              사업자등록번호
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              대표자
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              전화번호
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              이메일
            </Typography>
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-6"
            >
              저작권안내
            </Typography>
          </Wrapper.Item>
          <Wrapper.Item css={style.footerLeftItem}>
            <Link href="/market">
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
              >
                매장
              </Typography>
            </Link>
            <Link href="/magazine">
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
              >
                슈마매거진
              </Typography>
            </Link>
            <Link href="/community">
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
              >
                커뮤니티
              </Typography>
            </Link>
            <Link href="/partnership">
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
              >
                제휴업체
              </Typography>
            </Link>
            <Link href="/inquiry">
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
              >
                문의하기
              </Typography>
            </Link>
          </Wrapper.Item>
        </Wrapper.Left>
        <Wrapper.Right css={style.footerRight}>
          <Wrapper.Item>
            <Button type="button" variant="Init" onClick={handleServiceModal}>
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
                style={{
                  cursor: 'pointer',
                }}
              >
                이용약관
              </Typography>
            </Button>
            <Button type="button" variant="Init" onClick={handlePrivacyModal}>
              <Typography
                fontSize="body-14"
                fontWeight="regular"
                lineHeight="150%"
                color="greyScale-6"
                style={{
                  cursor: 'pointer',
                }}
              >
                개인정보처리방침
              </Typography>
            </Button>
          </Wrapper.Item>
          <Wrapper.Item>
            <Image
              src={playStoreSrc}
              alt="playstore"
              style={{
                cursor: 'pointer',
              }}
            />
            <Image
              src={appStoreSrc}
              alt="appstore"
              style={{
                cursor: 'pointer',
              }}
              onClick={handleAppStoreModal}
            />
          </Wrapper.Item>
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

export default Footer;
