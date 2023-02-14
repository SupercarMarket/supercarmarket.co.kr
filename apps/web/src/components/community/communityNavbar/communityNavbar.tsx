import { Container, Typography, Wrapper } from '@supercarmarket/ui';
import type { Links } from '@supercarmarket/types/base';
import community from 'constants/community';
import Link from 'next/link';
import { css } from 'styled-components';

const CommunityNavbarItem = (link: Links) => {
  return (
    <Container width="160px" display="flex" flexDirection="column" gap="4px">
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
          <Link key={children.title} href={children.href}>
            <Wrapper
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
              `}
            >
              <span>{children.title}</span>
            </Wrapper>
          </Link>
        ))}
    </Container>
  );
};

const CommunityNavbar = () => {
  return (
    <Container
      position="absolute"
      width="160px"
      display="flex"
      flexDirection="column"
      border="1px solid #C3C3C7"
      borderRadius="4px"
      top="0"
      left="-192px"
    >
      <Wrapper
        css={css`
          padding: 12px;
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
