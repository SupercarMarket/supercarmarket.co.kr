import * as React from 'react';

import Container from '../container';
import Wrapper from '../wrapper';

interface FormImageProps {
  title: string;
}

interface FormImageThumbnailProps {
  thumbnail: string;
}

const FormImageThumbnail = React.memo(
  function FormImageThumbnail({}: FormImageThumbnailProps) {
    return (
      <Container>
        <h1></h1>
      </Container>
    );
  }
);

const FormImage = ({}: FormImageProps) => {
  return (
    <Container>
      <Wrapper></Wrapper>
    </Container>
  );
};

export default FormImage;
