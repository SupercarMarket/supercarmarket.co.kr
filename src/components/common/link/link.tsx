import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
}

const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
