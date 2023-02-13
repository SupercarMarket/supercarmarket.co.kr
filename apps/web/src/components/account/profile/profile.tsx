import { Container, Wrapper } from '@supercarmarket/ui';
import { Profile as ProfileType } from '@supercarmarket/types/account';
import Image from 'next/image';
import { css } from 'styled-components';

import * as style from './profile.styled';
import ProfileInfo from './profileInfo';

export interface ProfileProps {
  isMyAccountPage: boolean;
  profile: ProfileType;
}

interface ProfileBackgroundProps {
  src: string | null;
}

interface ProfileRepresentativeProps {
  images?: string[];
}

const ProfileBackground = ({ src }: ProfileBackgroundProps) => {
  return (
    <Container position="absolute">
      <Image
        src={
          src
            ? src
            : 'https://user-images.githubusercontent.com/66871265/210207112-a0d7b276-e24b-4ae9-80a1-8e48d5cc45f2.png'
        }
        alt="background"
        width={1920}
        height={400}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
    </Container>
  );
};

const ProfileRepresentative = ({ images }: ProfileRepresentativeProps) => {
  return (
    <Container
      display="grid"
      flex="1"
      gap="20px"
      alignItems="center"
      gridTemplateColumns="1fr 1fr 1fr"
    >
      {images &&
        images.map((image) => (
          <Wrapper key={image}>
            <Image
              src={image}
              alt="대표이미지"
              width={260}
              height={260}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                zIndex: 999,
                borderRadius: '20px',
              }}
            />
          </Wrapper>
        ))}
      {images &&
        Array.from({ length: 3 - images.length }).map((_, index) => (
          <Wrapper
            key={index}
            css={css`
              width: 280px;
              height: 280px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: ${({ theme }) => theme.color['greyScale-2']};
              border: 1px solid ${({ theme }) => theme.color['greyScale-4']};
              border-radius: 20px;
              z-index: 999;
            `}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_275_10412)">
                <path
                  d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  fill="#8E8E95"
                />
              </g>
              <defs>
                <clipPath id="clip0_275_10412">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Wrapper>
        ))}
    </Container>
  );
};

const Profile = (props: ProfileProps) => {
  const { profile, ...rest } = props;
  return (
    <Container position="relative" padding="0 0 80px 0">
      <ProfileBackground src={profile.background} />
      <Wrapper css={style.wrapper}>
        <ProfileInfo profile={profile} {...rest} />
        <ProfileRepresentative images={profile.gallery} />
      </Wrapper>
    </Container>
  );
};

export default Profile;
