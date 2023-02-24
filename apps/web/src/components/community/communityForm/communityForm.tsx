import {
  Button,
  Form,
  FormFiles,
  FormInput,
  FormLabel,
  FormSelect,
  Typography,
  Wrapper,
} from '@supercarmarket/ui';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { css } from 'styled-components';
import type { Editor } from '@toast-ui/react-editor';
import type { CommunityTemporaryStorageDto } from '@supercarmarket/types/community';
import ModalContext from 'feature/modalContext';
import TemporaryStorageModal from 'components/common/modal/temporaryStorageModal';
import { FormProvider, useForm } from 'react-hook-form';
import { FormState } from 'constants/community';

interface CommunityFormProps {
  temporaryStorage: CommunityTemporaryStorageDto;
}

interface CommunityFormEditorImages {
  file: File;
  local: string;
}

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const scanner = () => {
  return;
};

const CommunityForm = (props: CommunityFormProps) => {
  const { temporaryStorage } = props;

  const [category, setCategory] = React.useState('');
  const [isInitialize, setIsInitialize] = React.useState(false);
  const [images, setImages] = React.useState<CommunityFormEditorImages[]>([]);
  const editor = React.useRef<InstanceType<typeof Editor>>(null);
  const { onClick, onClose, onOpen } = React.useContext(ModalContext);
  const methods = useForm<FormState>();

  const handleInitialize = React.useCallback(() => {
    setIsInitialize((prev) => !prev);
    const instance = editor.current?.getInstance();

    if (instance && temporaryStorage.contents)
      instance.setHTML(temporaryStorage.contents);

    if (temporaryStorage.images.length > 0)
      setImages(() =>
        temporaryStorage.images.map((i) => ({
          file: new File([i], i),
          local: i,
        }))
      );

    onClose();
  }, [onClose, temporaryStorage.contents, temporaryStorage.images]);

  const handleInitEditor = React.useCallback(() => {
    const instance = editor.current?.getInstance();

    if (!instance) return;

    instance.removeHook('addImageBlobHook');
    instance.addHook('addImageBlobHook', (blob, dropImage) => {
      const local = URL.createObjectURL(blob);
      setImages((prev) => [...prev, { file: blob, local }]);
      dropImage(local, local);
    });
  }, []);

  const handleRequire = (data: FormState) => {
    const { category, title, files } = data;

    const html = editor.current?.getInstance()?.getHTML();

    return new Promise<{}>((resolve, reject) => {
      if (!html) {
        reject();
        return;
      }

      const document = new DOMParser().parseFromString(html, 'text/html');
      const img = Array.from(document.querySelectorAll('img'));
      const isImg = img.length > 0;
      const isTempImg =
        temporaryStorage.images && temporaryStorage.images.length > 0;
      const thumbnail = isImg ? img[0].src : null;

      // * 불러오지 않고, 이미지가 존재하는 경우와 없는 경우
      // * 에디터 본문에 이미지가 없는 경우

      // * 불러온 후, 임시저장과 에디터 본문 이미지가 그대로인 경우
      // * 이미지에 변동이 있는 경우
      // * 모두 삭제된 경우
      // * 임시저장 이미지의 길이가 존재하는지 확인

      let dto = {};
      let addImgSrcs = null,
        deleteImgSrcs = null;

      dto = {
        tempId: temporaryStorage.tempId,
        thumbnail,
      };

      console.log(isImg, isInitialize, isTempImg);

      if (!isInitialize && !isImg) {
        dto = {
          ...dto,
          addImgSrcs,
          deleteImgSrcs,
        };
      }

      // * 본문 임시저장 이미지도 고려해야함
      const currentImages = images.filter((prev) =>
        img.some((el) => el.src === prev.local)
      );

      if (!isInitialize && isImg) {
        addImgSrcs = currentImages.map((i) => i.local);
        dto = {
          ...dto,
          addImgSrcs,
        };
      }

      // * @임시저장 이미지가 존재하지 않고, 내부 에디터에 이미지가 존재하지 않는 경우

      if (!isTempImg && isInitialize && !isImg) {
        dto = {
          ...dto,
          addImgSrcs: null,
          deleteImgSrcs: null,
        };
      }

      // * @임시저장 이미지가 존재하지 않고, 내부 에디터에 이미지가 존재하는 경우

      if (!isTempImg && isInitialize && isImg) {
        addImgSrcs = currentImages.map((i) => i.local);
        dto = {
          ...dto,
          addImgSrcs,
          deleteImgSrcs: null,
        };
      }

      // * @임시저장 이미지가 존재하고, 내부 에디터에 이미지가 존재하지 않는 경우

      if (isTempImg && isInitialize && !isImg) {
        deleteImgSrcs = temporaryStorage.images;
        dto = {
          ...dto,
          deleteImgSrcs,
          addImgSrcs: null,
        };
      }

      // * @임시저장 이미지가 존재하고, 내부 에디터에 이미지가 존재해 변동이 생긴 경우

      if (isTempImg && isInitialize && isImg) {
        deleteImgSrcs = temporaryStorage.images.filter((i) =>
          currentImages.some((el) => el.local !== i)
        );
        addImgSrcs =
          currentImages.filter((i) => i.local.includes('blob')) || null;
        dto = {
          ...dto,
          deleteImgSrcs,
          addImgSrcs,
        };
      }

      resolve(html);
    });
  };

  const handleSubmit = methods.handleSubmit((data) =>
    handleRequire(data).then((html) => {
      const { title, category, files } = data;
      const {} = html;

      const formData = new FormData();
      formData.append(
        'requestDto',
        new Blob(
          [
            JSON.stringify({
              title,
              category,
            }),
          ],
          { type: 'application/json' }
        )
      );
    })
  );

  React.useEffect(() => {
    if (temporaryStorage.tempId)
      onOpen(
        <TemporaryStorageModal
          onClick={onClick}
          onClose={onClose}
          onOpen={onOpen}
          onInit={handleInitialize}
        />
      );
  }, [handleInitialize, onClick, onClose, onOpen, temporaryStorage]);

  console.log(images);

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 0;
        `}
      >
        <FormLabel name="category" label="카테고리" bold>
          <FormSelect
            name="category"
            option={{
              name: 'community',
              values: ['제보', '포토갤러리', '내 차 자랑', '자료실'],
            }}
            callback={(value) => setCategory(value)}
          />
        </FormLabel>
        <FormLabel name="title" label="제목" bold>
          <FormInput name="title" placeholder="제목을 입력해주세요." />
        </FormLabel>
        {category === '자료실' && (
          <FormLabel name="files" label="첨부파일" bold>
            <FormFiles
              name="files"
              defaultValues={
                temporaryStorage.tempId &&
                temporaryStorage.category === 'information' &&
                temporaryStorage.files.length > 0
                  ? temporaryStorage.files.map(
                      (file) => new File([file.url], file.name)
                    )
                  : undefined
              }
              callback={(files) => methods.setValue('files', files)}
            />
          </FormLabel>
        )}
        <CommunityEditor editor={editor} init={handleInitEditor} />
        <Wrapper
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Typography
            fontSize="body-16"
            fontWeight="regular"
            lineHeight="150%"
            color="greyScale-5"
          >
            00:00 자동저장 되었습니다.
          </Typography>
          <Wrapper.Item
            css={css`
              display: flex;
              gap: 9px;
            `}
          >
            <Button variant="Line" type="button">
              취소
            </Button>
            <Button variant="Line" type="button">
              임시저장
            </Button>
            <Button variant="Primary" type="submit">
              작성 완료
            </Button>
          </Wrapper.Item>
        </Wrapper>
      </Form>
    </FormProvider>
  );
};

export default CommunityForm;
