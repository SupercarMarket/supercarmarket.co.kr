import Avvvatars from 'avvvatars-react';
import Image from 'next/image';

import Container from '../container';
import Typography from '../typography';

interface AvatarProps {
  nickname: string;
  profileSrc: string | null;
  size?: number;
}

const Avatar = ({ nickname, profileSrc, size }: AvatarProps) => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="8px"
    >
      {profileSrc ? (
        <Image
          src={profileSrc}
          alt="profile"
          width={24}
          height={24}
          style={{
            borderRadius: '12px',
          }}
        />
      ) : (
        <Avvvatars value={nickname} size={size} radius={12} />
      )}
      <Typography
        fontSize="body-16"
        fontWeight="regular"
        color="greyScale-6"
        lineHeight="150%"
      >
        {nickname}
      </Typography>
    </Container>
  );
};

export default Avatar;
