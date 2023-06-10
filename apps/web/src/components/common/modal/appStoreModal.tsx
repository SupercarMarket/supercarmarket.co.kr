import {
  applyMediaQuery,
  Button,
  theme,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import Image from 'next/image';
import { css } from 'styled-components';
import appStoreSrc_1 from '../../../../public/images/appstore_1.png';
import appStoreSrc_2 from '../../../../public/images/appstore_2.png';
import appStoreSrc_3 from '../../../../public/images/appstore_3.png';
import appStoreSrc_4 from '../../../../public/images/appstore_4.png';

const AppStoreModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(0,0,0,0.5)',
      }}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        onClose();
      }}
    >
      <Wrapper
        css={css`
          padding: 34px 24px 24px 24px;
          border: 1px solid #c3c3c7;
          border-radius: 4px;
          box-sizing: border-box;
          background: #fff;
          display: flex;
          flex-direction: column;
          ${applyMediaQuery('mobile')} {
            width: 311px;
            height: 480px;
            padding: 24px;
          }
        `}
      >
        <Typography
          as="h4"
          fontSize="header-20"
          fontWeight="bold"
          color="greyScale-6"
          lineHeight="150%"
          style={{
            marginBottom: '16px',
          }}
        >
          아이폰 사용자 어플 다운 안내
        </Typography>
        <Wrapper.Top
          css={css`
            display: flex;
            background-color: ${theme.color['greyScale-2']};
            border-radius: 4px;
            padding: 43px 0;
            ${applyMediaQuery('mobile')} {
              display: flex;
              flex-direction: column;
              overflow: auto;
              gap: 15px;
            }
          `}
        >
          <Wrapper.Item
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              align-items: center;
              padding: 0 18.5px;
            `}
          >
            <Typography
              as="h2"
              fontSize="header-20"
              fontWeight="bold"
              lineHeight="150%"
            >
              STEP 1
            </Typography>
            <Typography
              as="h2"
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="120%"
            >
              사파리로 사이트에 접속
            </Typography>
            <Image src={appStoreSrc_1} alt="appstore_1" />
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              align-items: center;
              padding: 0 18.5px;
            `}
          >
            <Typography
              as="h2"
              fontSize="header-20"
              fontWeight="bold"
              lineHeight="150%"
            >
              STEP 2
            </Typography>
            <Typography
              as="h2"
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="120%"
            >
              공유 버튼 누르기
            </Typography>
            <Image src={appStoreSrc_2} alt="appstore_2" />
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              align-items: center;
              padding: 0 18.5px;
            `}
          >
            <Typography
              as="h2"
              fontSize="header-20"
              fontWeight="bold"
              lineHeight="150%"
            >
              STEP 3
            </Typography>
            <Typography
              as="h2"
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="120%"
            >
              {`하단의 '홈 화면에 추가' 버튼 누르기`}
            </Typography>
            <Image src={appStoreSrc_3} alt="appstore_3" />
          </Wrapper.Item>
          <Wrapper.Item
            css={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              align-items: center;
              padding: 0 18.5px;
            `}
          >
            <Typography
              as="h2"
              fontSize="header-20"
              fontWeight="bold"
              lineHeight="150%"
            >
              STEP 4
            </Typography>
            <Typography
              as="h2"
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="120%"
            >
              {`이름을 지정하고 '추가' 버튼 누르기`}
            </Typography>
            <Image src={appStoreSrc_4} alt="appstore_4" />
          </Wrapper.Item>
        </Wrapper.Top>
        <Wrapper.Bottom
          css={css`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-top: 16px;
          `}
        >
          <Button variant="Line" width="160px" onClick={onClose}>
            닫기
          </Button>
        </Wrapper.Bottom>
      </Wrapper>
    </div>
  );
};

export default AppStoreModal;
