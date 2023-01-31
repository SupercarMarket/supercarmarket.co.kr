import Container from 'components/common/container';
import Wrapper from 'components/common/wrapper';
import Image from 'next/image';
import { Profile as ProfileType } from 'types/account';

import * as style from './profile.styled';
import ProfileInfo from './profileInfo';

export interface ProfileProps {
  isMyAccountPage: boolean;
  profile: ProfileType;
}

interface ProfileBackgroundProps {
  src: string;
}

interface ProfileRepresentativeProps {
  images?: string[];
}

const ProfileBackground = ({ src }: ProfileBackgroundProps) => {
  return (
    <Container position="absolute">
      <Image
        src={src}
        alt="background"
        width={1920}
        height={400}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          zIndex: 1,
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
                zIndex: 100,
                borderRadius: '20px',
              }}
            />
          </Wrapper>
        ))}
    </Container>
  );
};

const Profile = (props: ProfileProps) => {
  const { profile, ...rest } = props;
  return (
    <Container position="relative" padding="0 0 80px 0">
      <ProfileBackground src="https://user-images.githubusercontent.com/66871265/210207112-a0d7b276-e24b-4ae9-80a1-8e48d5cc45f2.png" />
      <Wrapper css={style.wrapper}>
        <ProfileInfo profile={profile} {...rest} />
        <ProfileRepresentative
          images={[
            'https://user-images.githubusercontent.com/66871265/210207136-2ff5d0a2-0284-4d82-bddf-d4bc6021d679.png',
            'https://user-images.githubusercontent.com/66871265/210207152-fda9ad2a-fc52-4008-bbae-01246d6554b7.png',
            'https://user-images.githubusercontent.com/66871265/210207156-d191ca25-2fb5-4d55-8ea4-12988ae14809.png',
          ]}
        />
      </Wrapper>
    </Container>
  );
};

export default Profile;
