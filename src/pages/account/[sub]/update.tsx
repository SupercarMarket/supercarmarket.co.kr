import Container from 'components/common/container';
import Title from 'components/common/title';
import layout from 'components/layout';
import React from 'react';

const ProfileUpdate = () => {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="80px 0"
    >
      <Title textAlign="center">개인정보 수정</Title>
      <h1></h1>
    </Container>
  );
};

ProfileUpdate.Layout = layout;

export default ProfileUpdate;
