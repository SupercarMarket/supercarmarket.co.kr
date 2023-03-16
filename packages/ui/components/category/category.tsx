import { css } from 'styled-components';
import { Container } from '../container';
import { Wrapper } from '../wrapper';
import Link from 'next/link';
import { Button } from '../button';
import { Typography } from '../typography';
import type { UrlObject } from 'url';
import { applyMediaQuery } from '../../styles';

interface CategoryProps {
  links: {
    title: string;
    category: string;
    href: string | UrlObject;
  }[];
  category: string;
}

const Category = (props: CategoryProps) => {
  const { links, category } = props;

  return (
    <Container role="navigation" width="100%">
      <Wrapper
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 20px;
          ${applyMediaQuery('mobile')} {
            margin-bottom: 16px;
          }
        `}
      >
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <Button
              variant={link.category === category ? 'Primary' : 'Line'}
              border="rounded"
            >
              <Typography
                as="span"
                fontSize="body-16"
                fontWeight="regular"
                lineHeight="150%"
                color={link.category === category ? 'white' : 'black'}
              >
                {link.title}
              </Typography>
            </Button>
          </Link>
        ))}
      </Wrapper>
    </Container>
  );
};

export { Category };
export type { CategoryProps };
