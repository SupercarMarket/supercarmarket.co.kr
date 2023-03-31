import * as React from 'react';
import { Container, Wrapper } from '@supercarmarket/ui';
import { Profile as ProfileType } from '@supercarmarket/types/account';
import * as style from './profile.styled';
import ProfileInfo from './components/profileInfo';
import { useSession } from 'next-auth/react';
import { useAccount } from 'http/server/account';
import { ProfileBackground, ProfileRepresentative } from './components';

export interface ProfileProps {
  isMyAccountPage: boolean;
  sub: string;
  profile: ProfileType;
}

const Profile = (props: ProfileProps) => {
  const { profile, sub, isMyAccountPage, ...rest } = props;
  const { data: session, status } = useSession();
  const { data: account } = useAccount(sub, session?.accessToken, {
    enabled: status && status !== 'loading',
  });

  return (
    <Container position="relative" padding="0 0 80px 0">
      {account && (
        <>
          <ProfileBackground
            src={account.data.background}
            sub={sub}
            session={session}
            isMyAccountPage={isMyAccountPage}
          />
          <Wrapper css={style.wrapper}>
            <ProfileInfo
              profile={account.data}
              sub={sub}
              isMyAccountPage={isMyAccountPage}
              {...rest}
            />
            <ProfileRepresentative
              isMyAccountPage={isMyAccountPage}
              images={account.data.gallery}
              session={session}
              sub={sub}
            />
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default Profile;
