'use client';

import { FindForm } from 'components/auth';
import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
<<<<<<< HEAD
import { AuthProvider } from 'feature/authProvider';
=======
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { isValidQuery } from 'utils/misc';

const Find = () => {
  const router = useRouter();
  const type = useSearchParams().get('type');

  useEffect(() => {
    if (isValidQuery(type, 'id', 'password')) router.push('/auth/signin');
  }, [router, type]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
      gap="60px"
    >
      <Title textAlign="center">
        {type === 'id' ? '아이디' : '비밀번호'} 찾기
      </Title>
<<<<<<< HEAD
      <AuthProvider>
        {(type === 'id' || type === 'password') && <FindForm type={type} />}
      </AuthProvider>
=======
      {(type === 'id' || type === 'password') && <FindForm type={type} />}
>>>>>>> 45c355dfdce16a4132d1d52bd9d7eabb4caf0864
    </Container>
  );
};

Find.Layout = layout;

export default Find;
