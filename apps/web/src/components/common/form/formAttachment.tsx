import Image from 'next/image';
import * as React from 'react';
import { css } from 'styled-components';

import CloseIcon from '../../../assets/svg/close.svg';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import * as style from './form.styled';
import { Input, Label } from './form.styled';

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
              <CloseIcon />
            </Wrapper.Item>
          </Button>
        </Wrapper.Right>
      </Wrapper>
    </Container>
  );
};

const FormAttachment = (
  props: FormAttachmentProps,
  ref: React.Ref<HTMLInputElement>
) => {
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
        <Button variant="Line" type="button" width="120px" suffix={<div></div>}>
          <Label htmlFor={name}>{title}</Label>
        </Button>
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
          `}
        >
          {files.map((file, index) => (
            <FormAttachmentItem
              key={index + 1}
              index={index}
              file={file.file}
              thumbnail={file.thumbnail}
              title={'사진 ' + index}
              handleRemove={handleRemove}
            />
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

export default React.forwardRef(FormAttachment);
