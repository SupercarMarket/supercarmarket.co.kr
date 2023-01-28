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

type FormImagesState = Array<File | null>;

interface FormImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  index: number;
  defaultValue?: string;
  setImages: React.Dispatch<React.SetStateAction<FormImagesState>>;
}

interface FormImagesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  size?: number;
  defaultValue?: string[];
  callback?: (file: FormImagesState) => void;
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

const FormImage = React.forwardRef(function FormImage(
  props: FormImageProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    title,
    name = '사진',
    index,
    defaultValue,
    setImages,
    ...rest
  } = props;
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
    setImages((prev) =>
      prev.map((value, __index) => {
        if (__index === index) {
          return null;
        }
        return value;
      })
    );
    setImage(null);
    setThumbnail(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];

    setImages((prev) =>
      prev.map((value, __index) => {
        if (__index === index) {
          return image;
        }
        return value;
      })
    );
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
            사진{title}
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
                {...rest}
                ref={ref}
                id={name}
                accept="image/jpg, image/png, image/jpeg"
                type="file"
                onChange={handleChange}
              />
            </>
          )}
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
});

const FormImages = (props: FormImagesProps) => {
  const {
    title,
    name = '사진',
    size = 1,
    defaultValue,
    callback,
    ...rest
  } = props;

  const [images, setImages] = React.useState<FormImagesState>(
    Array.from({ length: size }, () => null)
  );

  React.useEffect(() => {
    if (callback) callback(images);
  }, [images]);

  return (
    <Container display="flex" flexDirection="row" gap="16px">
      {images.map((_, order) => (
        <FormImage
          key={order}
          name={`${
            name + String.fromCharCode(Math.floor(Math.random() * 20 + 65))
          }`}
          index={order}
          title={title ? title : `${order + 1}`}
          defaultValue={defaultValue ? defaultValue[order] : undefined}
          setImages={setImages}
          {...rest}
        />
      ))}
    </Container>
  );
};

export default FormImages;
