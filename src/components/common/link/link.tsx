import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';

interface LinkProps extends NextLinkProps {
  children?: React.ReactNode;
  width?: string;
}

const Link = ({ href, children, width, ...props }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a
        style={{
          width,
        }}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
