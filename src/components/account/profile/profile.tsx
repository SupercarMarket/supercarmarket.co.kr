import Container from 'components/common/container';
import Wrapper from 'components/common/wrapper';
import Image from 'next/image';

import * as style from './profile.styled';

interface ProfileBackgroundProps {
  src: string;
}

const ProfileBackground = ({ src }: ProfileBackgroundProps) => {
  return (
    <Wrapper css={style.background}>
      <Image src={src} alt="background" fill />;
    </Wrapper>
  );
};

const Profile = () => {
  return (
    <Container position="relative" width="100vw" height="400px">
      <ProfileBackground src="https://user-images.githubusercontent.com/66871265/210207112-a0d7b276-e24b-4ae9-80a1-8e48d5cc45f2.png" />
    </Container>
  );
};

export default Profile;
