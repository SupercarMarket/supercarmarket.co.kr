import Wrapper from 'components/common/wrapper';
import Link from 'next/link';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

const Toggle = () => {
  return (
    <Wrapper
      css={css`
        position: fixed;
        bottom: 0;
        right: 80px;
        bottom: 40px;
        button {
          all: unset;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 20px 40px;
          gap: 10px;
          background: #ffffff;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
          border-radius: 20px;
        }
        b {
          font-weight: bold;
          font-size: 1rem;
          line-height: 120%;
          color: #1e1e20;
        }
        ${applyMediaQuery('mobile')} {
          right: 40px;
          bottom: 20px;
          button {
            padding: 15px 20px;
          }
        }
      `}
    >
      <Link href="/inquiry">
        <button>
          <b>문의/상담은 여기로!</b>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_206_2548)">
              <path
                d="M6.48999 20.1296L8.25999 21.8996L18.16 11.9996L8.25999 2.09961L6.48999 3.86961L14.62 11.9996L6.48999 20.1296Z"
                fill="current"
              />
            </g>
            <defs>
              <clipPath id="clip0_206_2548">
                <rect width="25" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </Link>
    </Wrapper>
  );
};

export default Toggle;
