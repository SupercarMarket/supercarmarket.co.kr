import Image from 'next/image';
import * as React from 'react';
import { css } from 'styled-components';

import { Button } from '../components/button';
import { Container } from '../components/container';
import { Typography } from '../components/typography';
import { Wrapper } from '../components/wrapper';
import * as style from './form.styled';
import { Input, Label } from './form.styled';
import { applyMediaQuery } from '../styles';

type FormImagesState = Array<{ file: File; thumbnail: string }>;

interface FormImageThumbnailProps {
  thumbnail: string;
}

type FormAttachmentProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  description?: string;
  size?: number;
  callback?: (files: FormImagesState) => void;
};

interface FormImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  index: number;
  thumbnail: string;
  file: File;
  handleRemove: (index: number) => void;
}

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
          objectFit: 'cover',
        }}
      />
    </Container>
  );
});

const FormAttachmentItem = (props: FormImageProps) => {
  const { title, file, thumbnail, index, handleRemove } = props;

  return (
    <Container display="flex" flexDirection="column" gap="10px">
      <FormImageThumbnail thumbnail={thumbnail} />
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
          {file && (
            <Typography
              fontSize="body-14"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
            >
              {file.name}
            </Typography>
          )}
        </Wrapper.Left>
        <Wrapper.Right>
          <Button
            type="button"
            variant="Init"
            onClick={() => handleRemove(index)}
          >
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
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

const FormAttachment = React.forwardRef(function FormAttachment(
  props: FormAttachmentProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    name,
    size,
    title = '파일추가',
    description,
    callback,
    ...rest
  } = props;
  const [files, setFiles] = React.useState<FormImagesState>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = e.target.files;

    if (!currentFiles) return;

    const files = await Promise.all(
      Array.from(currentFiles).map(async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const response = new Promise((resolve) => {
          reader.onload = () => {
            resolve(reader.result);
          };
        });

        const thumbnail = (await response) as string;
        const data = { file: file, thumbnail };

        return data;
      })
    ).then((v) => v);

    setFiles(files);
  };

  const handleRemove = React.useCallback((__index: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== __index));
  }, []);

  React.useEffect(() => {
    if (callback) callback(files);
  }, [files]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="8px"
    >
      <Wrapper
        css={css`
          display: flex;
          align-items: center;
          gap: 24px;
        `}
      >
        <Label htmlFor={name}>{title}</Label>
        {description && (
          <Typography
            fontSize="body-14"
            fontWeight="regular"
            color="greyScale-5"
            lineHeight="150%"
          >
            {description}
          </Typography>
        )}
      </Wrapper>
      <Input
        ref={ref}
        id={name}
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        multiple
        onChange={handleChange}
        disabled={size && files.length === size ? true : undefined}
        {...rest}
      />
      {files && (
        <Wrapper
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            ${applyMediaQuery('mobile')} {
              width: 100%;
              ${size === 1 && ' grid-template-columns: 1fr;'}
            }
          `}
        >
          {files.map((file, index) => (
            <FormAttachmentItem
              key={index + 1}
              index={index}
              file={file.file}
              thumbnail={file.thumbnail}
              title={index === 0 ? '썸네일' : '사진 ' + index}
              handleRemove={handleRemove}
            />
          ))}
        </Wrapper>
      )}
    </Container>
  );
});

export { FormAttachment };
export type { FormAttachmentProps };
