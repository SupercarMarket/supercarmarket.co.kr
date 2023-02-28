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
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { css } from 'styled-components';
import type { Editor } from '@toast-ui/react-editor';
import type { CommunityTemporaryStorageDto } from '@supercarmarket/types/community';
import ModalContext from 'feature/modalContext';
import TemporaryStorageModal from 'components/common/modal/temporaryStorageModal';
import { FormProvider, useForm } from 'react-hook-form';
import { FormState } from 'constants/community';
import { fetcher } from '@supercarmarket/lib';
import { useSession } from 'next-auth/react';
import { formatter, reverseFormatter } from '../communityCard/communityCard';

interface CommunityFormProps {
  id?: string;
  initialData: CommunityTemporaryStorageDto;
}

interface CommunityFormEditorImages {
  file: File;
  local: string;
}

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const CommunityForm = (props: CommunityFormProps) => {
  const { id, initialData } = props;

  const { back, replace } = useRouter();
  const session = useSession();
  const [category, setCategory] = React.useState('');
  const [isInitialize, setIsInitialize] = React.useState(false);
  const [images, setImages] = React.useState<CommunityFormEditorImages[]>([]);
  const editor = React.useRef<InstanceType<typeof Editor>>(null);
  const { onClick, onClose, onOpen } = React.useContext(ModalContext);
  const methods = useForm<FormState>();

  const handleCancel = React.useCallback(() => {
    back();
  }, [back]);

  const handleInitialize = React.useCallback(() => {
    setIsInitialize((prev) => !prev);
    const instance = editor.current?.getInstance();

    if (instance && initialData.contents)
      instance.setHTML(initialData.contents);

    if (initialData.images?.length > 0)
      setImages(() =>
        initialData.images.map((i) => ({
          file: new File([i], i),
          local: i,
        }))
      );

    methods.setValue('title', initialData.title);

    onClose();
  }, [
    initialData.contents,
    initialData.images,
    initialData.title,
    methods,
    onClose,
  ]);

  const handleInitEditor = React.useCallback(() => {
    const instance = editor.current?.getInstance();

    if (!instance) return;

    if (id) {
      instance.setHTML(initialData.contents);
    }

    instance.removeHook('addImageBlobHook');
    instance.addHook('addImageBlobHook', (blob, dropImage) => {
      const local = URL.createObjectURL(blob);
      setImages((prev) => [...prev, { file: blob, local }]);
      dropImage(local, local);
    });
  }, [id, initialData.contents]);

  const handleEditorHtml = React.useCallback(async () => {
    const html = editor.current?.getInstance()?.getHTML();

    if (!html) {
      throw 'editor contents is require';
    }

    const document = new DOMParser().parseFromString(html, 'text/html');
    const img = Array.from(document.querySelectorAll('img'));
    const isImg = img.length > 0;
    const isTempImg = initialData.images && initialData.images.length > 0;
    const thumbnail = img[0]?.src || null;

    let addImgSrcs = null;
    let deleteImgSrcs = null;
    let addImgFiles = null;

    // * case 1-1 @임시저장을 불러오지 않음
    // * 내부 에디터에 이미지가 존재하지 않는 경우

    // ! 본문 임시저장 이미지도 고려해야함
    const currentImages = images.filter((prev) =>
      img.some((el) => el.src === prev.local)
    );

    // * case 1-2 내부 에디터에 이미지가 존재하는 경우

    if (!isInitialize && isImg) {
      addImgSrcs = currentImages.map((i) => i.local);
      addImgFiles = currentImages.map((i) => i.file);
    }

    // * case 2-1 @임시저장을 불러옴
    // * @임시저장 이미지가 존재하지 않고, 내부 에디터에 이미지가 존재하지 않는 경우

    // * case 2-2 @임시저장 이미지가 존재하지 않고, 내부 에디터에 이미지가 존재하는 경우

    if (!isTempImg && isInitialize && isImg) {
      addImgSrcs = currentImages.map((i) => i.local);
      addImgFiles = currentImages.map((i) => i.file);
    }

    // * case 2-3 @임시저장 이미지가 존재하고, 내부 에디터에 이미지가 존재하지 않는 경우

    if (isTempImg && isInitialize && !isImg) {
      console.log('check');

      deleteImgSrcs = initialData.images;
    }

    // * case 2-4 @임시저장 이미지가 존재하고, 내부 에디터에 이미지가 존재해 변동이 생긴 경우

    if (isTempImg && isInitialize && isImg) {
      deleteImgSrcs = initialData.images.filter(
        (i) => !currentImages.some((el) => el.local === i)
      );
      const addImg = currentImages.filter((i) => i.local.includes('blob'));
      addImgSrcs = addImg.map((i) => i.local) || null;
      addImgFiles = addImg.map((i) => i.file) || null;
    }

    return {
      tempId: initialData.tempId || null,
      thumbnail,
      deleteImgSrcs,
      addImgSrcs,
      addImgFiles,
      html,
    };
  }, [images, initialData.images, initialData.tempId, isInitialize]);

  const handleFiles = React.useCallback(
    async (data: FormState) => {
      const { files } = data;

      const isLibrary = initialData?.category === 'information' || null;
      const isSelecteLibrary = category === '자료실';

      let addFiles = null;
      let deleteFilesSrcs = null;

      // * 애초에 카테고리가 자료실이 아닌경우와 자료실인 경우
      // * - 선택한 카테고리가 자료실인 경우와 아닌경우
      // *

      if (!isInitialize) {
        // * case 1-1
        // * 임시저장을 불러오지 않은 경우
        // * 선택한 카테고리가 자료실이 아닌 경우

        if (!isSelecteLibrary) {
        }

        // * case 1-2
        // * 선택한 카테고리가 자료실인 경우
        if (isSelecteLibrary) {
          addFiles = files;
        }
      }

      // * case 2-1
      // * 임시저장을 불러온 경우
      // * 임시저장 카테고리가 자료실이고 선택한 카테고리가 자료실이 아닌 경우
      if (isInitialize) {
        const currentTempFiles = initialData?.files || [];

        if (isLibrary && !isSelecteLibrary) {
          deleteFilesSrcs = initialData.files.map((file) => file.url);
        }

        // * case 2-2
        // * 임시저장 카테고리가 자료실이고 선택한 카테고리가 자료실인 경우
        if (isLibrary && isSelecteLibrary) {
          deleteFilesSrcs = currentTempFiles
            .filter((file) => !files.some((f) => f.name === file.name))
            .map((file) => file.url);
          addFiles = files.filter(
            (file) => !currentTempFiles.some((f) => f.name === file.name)
          );
        }
      }

      return {
        addFiles,
        deleteFilesSrcs,
      };
    },
    [category, initialData?.category, initialData.files, isInitialize]
  );

  const handleRequire = React.useCallback(
    async (data: FormState) => {
      const { title, category } = data;

      if (!title) {
        methods.setError('title', { message: '제목을 입력해주세요.' });
        throw 'title is require';
      }

      if (!category) {
        methods.setError('title', { message: '카테고리를 입력해주세요.' });
        throw 'category is require';
      }
    },
    [methods]
  );

  const handleSubmit = React.useCallback(
    async (data: FormState) =>
      handleRequire(data).then(async () => {
        const { title, category, temporaryStorage } = data;
        const {
          addImgFiles,
          addImgSrcs,
          deleteImgSrcs,
          thumbnail,
          tempId,
          html,
        } = await handleEditorHtml();
        const { addFiles, deleteFilesSrcs } = await handleFiles(data);

        const formData = new FormData();

        formData.append(
          'requestDto',
          new Blob(
            [
              JSON.stringify({
                title,
                category: reverseFormatter(category),
                addImgSrcs,
                thumbnail,
                tempId,
                deleteImgSrcs,
                deleteFilesSrcs,
                contents: html,
              }),
            ],
            { type: 'application/json' }
          )
        );

        if (addImgFiles?.length)
          addImgFiles.forEach((file) => formData.append('images', file));
        if (addFiles?.length)
          addFiles.forEach((file) => formData.append('files', file));

        const options = id
          ? { method: 'PATCH', params: id }
          : { method: 'POST' };

        let url = '/server/supercar/v1/community';

        if (id) url = `/server/supercar/v1/community/${id}`;

        if (temporaryStorage) url = '/server/supercar/v1/community-temp';

        formData.forEach((v, k) => {
          console.log(k, v);
        });

        await fetcher(url, {
          ...options,
          headers: {
            ACCESS_TOKEN: session.data?.accessToken || '',
          },
          body: formData,
        });
      }),
    [
      handleEditorHtml,
      handleFiles,
      handleRequire,
      id,
      session.data?.accessToken,
    ]
  );

  const handleTemporaryStorage = React.useCallback(async () => {
    const data = {
      title: methods.getValues('title'),
      category: methods.getValues('category'),
      files: methods.getValues('files'),
      temporaryStorage: true,
    };

    await handleSubmit(data);
  }, [handleSubmit, methods]);

  // * 임시저장 데이터 불러오기
  React.useEffect(() => {
    if (initialData?.tempId && !id)
      onOpen(
        <TemporaryStorageModal
          onClick={onClick}
          onClose={onClose}
          onOpen={onOpen}
          onInit={handleInitialize}
        />
      );
  }, [handleInitialize, onClick, onClose, onOpen, initialData, id]);

  return (
    <FormProvider {...methods}>
      <Form
        encType="multipart/form-data"
        onSubmit={methods.handleSubmit(handleSubmit)}
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
            defaultValues={
              isInitialize && initialData?.category
                ? formatter(initialData.category)
                : undefined
            }
            callback={(value) => {
              setCategory(value);
              methods.setValue('category', value);
            }}
          />
        </FormLabel>
        <FormLabel name="title" label="제목" bold>
          <FormInput
            placeholder="제목을 입력해주세요."
            defaultValue={
              isInitialize && initialData?.title ? initialData.title : undefined
            }
            {...methods.register('title')}
          />
        </FormLabel>
        {category === '자료실' && (
          <FormLabel name="files" label="첨부파일" bold>
            <FormFiles
              name="files"
              defaultValues={
                initialData.tempId &&
                initialData.category === 'information' &&
                initialData.files.length > 0
                  ? initialData.files.map(
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
            <Button variant="Line" type="button" onClick={handleCancel}>
              취소
            </Button>
            <Button
              variant="Line"
              type="button"
              onClick={handleTemporaryStorage}
            >
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
