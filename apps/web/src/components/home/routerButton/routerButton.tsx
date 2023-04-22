import { Button, Typography } from '@supercarmarket/ui';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';

import Arrow from '../../../assets/svg/arrow-right.svg';

interface RouterButtonProps {
  href: string;
  children?: ReactNode;
  style?: CSSProperties;
}

const RouterButton = ({ href, style, children }: RouterButtonProps) => {
  return (
    <Link href={href} style={style}>
      <Button type="button" variant="Line" border="rounded" suffix={<Arrow />}>
        {children}
        <Typography
          fontSize="body-16"
          fontWeight="regular"
          lineHeight="150%"
          color="greyScale-6"
        >
          {' '}
          더보기
        </Typography>
      </Button>
    </Link>
  );
};

export default RouterButton;
