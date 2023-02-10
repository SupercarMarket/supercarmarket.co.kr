import Button from 'components/common/button';
import Link from 'next/link';
import type { ReactNode } from 'react';

import Arrow from '../../../assets/svg/arrow-right.svg';

interface RouterButtonProps {
  href: string;
  children?: ReactNode;
}

const RouterButton = ({ href, children }: RouterButtonProps) => {
  return (
    <Link href={href}>
      <Button type="button" variant="Line" border="rounded" suffix={<Arrow />}>
        {children}
      </Button>
    </Link>
  );
};

export default RouterButton;
