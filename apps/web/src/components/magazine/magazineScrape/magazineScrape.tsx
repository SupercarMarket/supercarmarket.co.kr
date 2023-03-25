import { Button, Typography, Wrapper } from '@supercarmarket/ui';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { css } from 'styled-components';
import { useMagazineScrap } from 'utils/api/magazine';

interface MagazineScrapeProps {
  isScraped: boolean;
  postId: string;
}

const Star = ({ isScraped }: MagazineScrapeProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_276_14072)">
        <path
          d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z"
          fill={isScraped ? 'red' : '#1E1E20'}
        />
      </g>
      <defs>
        <clipPath id="clip0_276_14072">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const MagazineScrape = ({ postId, isScraped }: MagazineScrapeProps) => {
  const session = useSession();
  const { mutate } = useMagazineScrap(postId);

  const handleScrape = React.useCallback(() => {
    if (session.status !== 'authenticated') return;
    mutate(session.data.accessToken);
  }, [mutate, session]);

  return (
    <Button variant="Line" onClick={handleScrape}>
      <Wrapper
        css={css`
          display: flex;
          align-items: center;
          gap: 4px;
        `}
      >
        <Star postId={postId} isScraped={isScraped} />
        <Typography
          as="span"
          fontSize="body-14"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          스크랩
        </Typography>
      </Wrapper>
    </Button>
  );
};

export default MagazineScrape;
