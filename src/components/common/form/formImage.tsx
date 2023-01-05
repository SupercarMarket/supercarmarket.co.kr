import Image from 'next/image';
import * as React from 'react';

import AddIcon from '../../../assets/svg/add.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import ThumbnailIcon from '../../../assets/svg/image.svg';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import { Input, Label } from './form.styled';
import * as style from './form.styled';

interface FormImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  callback?: (file: File) => void;
}

interface FormImageThumbnailProps {
  thumbnail: string;
}

const FormImageNoThumbnail = () => {
  return (
    <Container
      width="100%"
      height="180px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSizing="border-box"
      background="#F7F7F8"
      border="1px solid #C3C3C7"
      borderRadius="4px"
    >
      <ThumbnailIcon />
    </Container>
  );
};

const FormImageThumbnail = React.memo(function FormImageThumbnail({
  thumbnail,
}: FormImageThumbnailProps) {
  return (
    <Container>
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={320}
        height={180}
        style={{
          width: '100%',
        }}
      />
    </Container>
  );
});

const FormImage = (props: FormImageProps, ref: React.Ref<HTMLInputElement>) => {
  const { title, name, callback, ...rest } = props;
  const [image, setImage] = React.useState<File | null>(null);
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setThumbnail(reader.result as string);
        resolve(true);
      };
    });
  };

  const onRemove = () => {
    setImage(null);
    setThumbnail(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];

    if (callback) callback(image);
    encodeFileToBase64(image);
    setImage(image);
  };

  return (
    <Container display="flex" flexDirection="column" gap="10px">
      {thumbnail ? (
        <FormImageThumbnail thumbnail={thumbnail} />
      ) : (
        <FormImageNoThumbnail />
      )}
      <Wrapper css={style.imageWrapper}>
        <Wrapper.Left css={style.imageTitle}>
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-6"
          >
            {title}
          </Typography>
          {image && (
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
            >
              {image.name}
            </Typography>
          )}
        </Wrapper.Left>
        <Wrapper.Right>
          {image ? (
            <Button variant="Init" onClick={onRemove}>
              <Wrapper.Item css={style.imageButton}>
                <CloseIcon />
              </Wrapper.Item>
            </Button>
          ) : (
            <>
              <Label htmlFor={name}>
                <AddIcon />
                <Typography
                  fontSize="body-14"
                  fontWeight="regular"
                  lineHeight="150%"
                  color="greyScale-5"
                >
                  업로드
                </Typography>
              </Label>
              <Input
                ref={ref}
                id={name}
                accept="image/jpg, image/png, image/jpeg"
                type="file"
                onChange={handleChange}
                {...rest}
              />
            </>
          )}
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

export default React.forwardRef(FormImage);
