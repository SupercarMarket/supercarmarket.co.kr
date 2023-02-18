import { Button } from '../button';
import type { UrlObject } from 'url';
import * as React from 'react';
import { default as NLink } from 'next/link';

interface LinkProps extends React.PropsWithChildren {
  href: string | UrlObject;
  disabled?: boolean;
  shallow?: boolean;
  callback?: () => void;
}

const Link = (props: LinkProps) => {
  const { href, disabled, shallow, children, callback } = props;
  if (disabled) {
    return (
      <Button disabled variant="Init" type="button">
        {children}
      </Button>
    );
  }

  if (callback) {
    return (
      <Button variant="Init" type="button" onClick={callback}>
        {children}
      </Button>
    );
  }

  return (
    <NLink href={href} shallow={shallow}>
      {children}
    </NLink>
  );
};

export { Link };
export type { LinkProps };
