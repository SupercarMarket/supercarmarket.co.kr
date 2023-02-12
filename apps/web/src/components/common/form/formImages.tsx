import Image from 'next/image';
import * as React from 'react';
import type { ServerResponse } from 'types/base';

import AddIcon from '../../../assets/svg/add.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import ThumbnailIcon from '../../../assets/svg/image.svg';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import { Input, Label } from './form.styled';
import * as style from './form.styled';
import FormMessage from './formMessage';

type FormImagesState = Array<string | File | null>;

interface FormImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  index: number;
  defaultValue?: string;
  handleUpload?: (file: FileList) => Promise<ServerResponse<{ url: string }>>;
  handleRemove?: (image: string) => Promise<ServerResponse<boolean>>;
  setImages: React.Dispatch<React.SetStateAction<FormImagesState>>;
}

interface FormImagesProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  size?: number;
  defaultValue?: string[];
  handleUpload?: (file: FileList) => Promise<ServerResponse<{ url: string }>>;
  handleRemove?: (image: string) => Promise<ServerResponse<boolean>>;
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
    handleUpload,
    handleRemove,
    ...rest
  } = props;
  const [image, setImage] = React.useState<File | null>(null);
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

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
    setError(null);

    if (!thumbnail) return;
    if (!handleRemove) {
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
      return;
    }

    handleRemove(thumbnail)
      .then(() => {
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
      })
      .catch(() => {
        setError('이미지 삭제가 실패했습니다.');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (!e.target.files) return;

    const image = e.target.files[0];

    if (!handleUpload) {
      setImages((prev) =>
        prev.map((value, __index) => {
          if (__index === index) {
            return image;
          }
          return value;
        })
      );
      setImage(image);
      encodeFileToBase64(image);
      return;
    }

    handleUpload(e.target.files)
      .then((response) => {
        const { data } = response;
        setImages((prev) =>
          prev.map((value, __index) => {
            if (__index === index) {
              return data.url;
            }
            return value;
          })
        );
        setImage(image);
        setThumbnail(data.url);
      })
      .catch(() => {
        setError('이미지 업로드가 실패했습니다.');
      });
  };

  React.useEffect(() => {
    setThumbnail(() => defaultValue ?? null);
  }, [defaultValue]);

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
          {thumbnail ? (
            <Button type="button" variant="Init" onClick={onRemove}>
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
      <FormMessage error={error ? error : undefined} />
    </Container>
  );
});

const FormImages = (props: FormImagesProps) => {
  const {
    title,
    name = '사진',
    size = 1,
    defaultValue,
    handleUpload,
    handleRemove,
    callback,
    ...rest
  } = props;

  const [images, setImages] = React.useState<FormImagesState>(
    defaultValue && defaultValue.length >= 1
      ? Array.from({ length: size }, (_, index) => defaultValue[index] ?? null)
      : Array.from({ length: size }, () => null)
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
          handleUpload={handleUpload}
          handleRemove={handleRemove}
          {...rest}
        />
      ))}
    </Container>
  );
};

export default FormImages;
