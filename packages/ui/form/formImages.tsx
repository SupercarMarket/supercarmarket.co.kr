import Image from 'next/image';
import * as React from 'react';
import type { ServerResponse } from '@supercarmarket/types/base';

import { Button, Container, Typography } from '../components';
import { Wrapper } from '../components/wrapper';
import { Input, Label } from './form.styled';
import * as style from './form.styled';
import { FormMessage } from './formMessage';

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
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_276_12485)">
          <path
            d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z"
            fill="#8E8E95"
          />
        </g>
        <defs>
          <clipPath id="clip0_276_12485">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
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
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_275_10413)">
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="#1E1E20"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_275_10413">
                      <rect width="100%" height="100%" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Wrapper.Item>
            </Button>
          ) : (
            <>
              <Label htmlFor={name}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_275_10412)">
                    <path
                      d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                      fill="#8E8E95"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_275_10412">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                업로드
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

export { FormImages };
export type { FormImagesProps };
