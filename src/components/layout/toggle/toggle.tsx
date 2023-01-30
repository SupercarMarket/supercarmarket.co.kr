import Button from 'components/common/button';
import Typography from 'components/common/typography';
import Link from 'next/link';

const Toggle = () => {
  return (
    <Link
      href="/inquiry"
      style={{
        position: 'fixed',
        bottom: 40,
        right: 80,
      }}
    >
      <Button
        variant="Line"
        border="rounded"
        suffix={
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_206_2548)">
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
        }
        style={{
          height: '59px',
        }}
      >
        <Typography
          as="b"
          fontSize="header-16"
          fontWeight="bold"
          lineHeight="120%"
          color="greyScale-6"
        >
          문의/상담은 여기로!
        </Typography>
      </Button>
    </Link>
  );
};

export default Toggle;
