import {
  applyMediaQuery,
  Container,
  deviceQuery,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import type { Links } from '@supercarmarket/types/base';
import community from 'constants/community';
import Link from 'next/link';
import { css } from 'styled-components';
import { useMedia, useUrlQuery } from '@supercarmarket/hooks';

const CommunityNavbarItem = (link: Links) => {
  const { category } = useUrlQuery();

  return (
    <Wrapper
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
        ${applyMediaQuery('mobile')} {
          flex-direction: row;
          align-items: center;
        }
      `}
    >
      <Typography
        as="b"
        fontSize="header-16"
        fontWeight="bold"
        lineHeight="120%"
        color="greyScale-6"
        style={{
          padding: '12px',
        }}
      >
        {link.title}
      </Typography>
      {link.children &&
        link.children.map((children) => (
          <Link
            key={children.title}
            href={{
              pathname: link.href,
              query: {
                category: children.href,
              },
            }}
          >
            <Wrapper
              className={category === children.href ? 'active' : undefined}
              css={css`
                padding: 12px;
                font-weight: ${({ theme }) => theme.fontWeight.regular};
                font-size: ${({ theme }) => theme.fontSize['body-14']};
                line-height: 150%;
                color: ${({ theme }) => theme.color['greyScale-6']};
                border-radius: 4px;
                &:hover {
                  color: ${({ theme }) => theme.color.primary};
                  background: ${({ theme }) => theme.color['greyScale-2']};
                  font-weight: ${({ theme }) => theme.fontWeight.bold};
                }
                &.active {
                  color: ${({ theme }) => theme.color.primary};
                  background: ${({ theme }) => theme.color['greyScale-2']};
                  font-weight: ${({ theme }) => theme.fontWeight.bold};
                }
                ${applyMediaQuery('mobile')} {
                  padding: 8px;
                  line-height: 12px;
                }
              `}
            >
              <span>{children.title}</span>
            </Wrapper>
          </Link>
        ))}
    </Wrapper>
  );
};

const CommunityNavbar = () => {
  const { isMobile } = useMedia({ deviceQuery });
  return (
    <Container
      position={isMobile ? 'relative' : 'absolute'}
      top={isMobile ? 0 : 0}
      left={isMobile ? 0 : '-192px'}
      width={isMobile ? '100%' : '160px'}
      display="flex"
      flexDirection="column"
      border="1px solid #C3C3C7"
      borderRadius="4px"
    >
      <Wrapper
        css={css`
          padding: 12px;
          ${applyMediaQuery('mobile')} {
            display: flex;
            flex-direction: column;
          }
        `}
      >
        {community.links.map((link) => (
          <CommunityNavbarItem key={link.title} {...link} />
        ))}
      </Wrapper>
    </Container>
  );
};

export default CommunityNavbar;
