import * as React from 'react';

import AddIcon from '../../../assets/svg/add.svg';
import CloseIcon from '../../../assets/svg/close.svg';
import Button from '../button';
import Container from '../container';
import Typography from '../typography';
import Wrapper from '../wrapper';
import { Input, Label } from './form.styled';
import * as style from './form.styled';
import FormMessage from './formMessage';

type FormFilesProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: number;
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
        >{`파일 ${index}`}</Typography>
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
            <CloseIcon />
          </Wrapper>
        }
        onClick={onRemove}
      >
        삭제
      </Button>
    </Container>
  );
});

const FormFiles = (props: FormFilesProps, ref: React.Ref<HTMLInputElement>) => {
  const { name, size, callback, ...rest } = props;
  const [files, setFiles] = React.useState<File[]>([]);
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
      <Button variant="Line" type="button" suffix={<AddIcon />}>
        <Label htmlFor={name}>파일추가</Label>
      </Button>
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
};

export default React.forwardRef(FormFiles);
