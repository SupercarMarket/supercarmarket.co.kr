import * as React from 'react';
import { css } from 'styled-components';

import { Button, Container, Typography } from '../components';
import { Wrapper } from '../components/wrapper';
import { Input, Label } from './form.styled';
import * as style from './form.styled';
import { FormMessage } from './formMessage';

type FormFilesProps = React.InputHTMLAttributes<HTMLInputElement> & {
  title?: string;
  description?: string;
  size?: number;
  defaultValues?: File[];
  callback?: (files: File[]) => void;
};

interface FormFileProps {
  index: number;
  file: File;
  onRemove: () => void;
}

const FormFile = React.memo(function FormFile({
  index,
  file,
  onRemove,
}: FormFileProps) {
  return (
    <Container display="flex" alignItems="center" gap="8px">
      <Wrapper css={style.filesWrapper}>
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          color="greyScale-6"
          lineHeight="150%"
        >{`파일 ${index + 1}`}</Typography>
        <Typography
          fontSize="body-14"
          fontWeight="regular"
          color="greyScale-5"
          lineHeight="150%"
        >
          {file.name}
        </Typography>
      </Wrapper>
      <Button
        type="button"
        variant="Line"
        suffix={
          <Wrapper css={style.filesButton}>
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
          </Wrapper>
        }
        onClick={onRemove}
      >
        삭제
      </Button>
    </Container>
  );
});

const FormFiles = React.forwardRef(function FormFiles(
  props: FormFilesProps,
  ref: React.Ref<HTMLInputElement>
) {
  const {
    name,
    size,
    title = '파일추가',
    description,
    defaultValues,
    callback,
    ...rest
  } = props;
  const [files, setFiles] = React.useState<File[]>(defaultValues ?? []);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onRemove = React.useCallback((name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const currentFiles = e.target.files;

    if (!currentFiles) return;

    const currentFile = currentFiles[0];

    if (!files.length) {
      setFiles([currentFile]);

      return;
    }

    const isDuplicated = Array.from(files).some(
      (file) => file.name === currentFile.name
    );

    if (isDuplicated) {
      setErrorMessage('이미 파일이 존재합니다.');
      return;
    }

    setFiles((prev) => prev.concat(currentFile));
  };

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
        <input
          ref={ref}
          id={name}
          type="file"
          hidden
          onChange={handleChange}
          disabled={size && files.length === size ? true : undefined}
        />
        <Label htmlFor={name}>
          파일 추가
          <svg
            width="16"
            height="16"
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
        </Label>
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
      {errorMessage && <FormMessage error={errorMessage} />}
      <Input
        ref={ref}
        id={name}
        type="file"
        onChange={handleChange}
        disabled={size && files.length === size ? true : undefined}
        {...rest}
      />
      {files &&
        files.map((file, index) => (
          <FormFile
            key={index + 1}
            index={index}
            file={file}
            onRemove={() => onRemove(file.name)}
          />
        ))}
    </Container>
  );
});

export { FormFiles };
export type { FormFilesProps };
