import {
  Alert,
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
import { FormProvider, useForm } from 'react-hook-form';
import { FormState } from 'constants/community';
import { ErrorCode, fetcher } from '@supercarmarket/lib';
import { useSession } from 'next-auth/react';
import {
  formatter,
  getCategoryPathname,
  reverseFormatter,
} from '../communityCard/communityCard';
import dayjs from 'dayjs';
import { Modal } from 'components/common/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queries from 'constants/queries';

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

  const { back, push } = useRouter();
  const session = useSession();
  const [category, setCategory] = React.useState('');
  const [isInitialize, setIsInitialize] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const editor = React.useRef<InstanceType<typeof Editor>>(null);
  const [images, setImages] = React.useState<CommunityFormEditorImages[]>([]);
  const { onClick, onClose, onOpen } = React.useContext(ModalContext);
  const methods = useForm<FormState>();
  const queryClient = useQueryClient();
  const { formState } = methods;

  const handleCancel = React.useCallback(() => {
    back();
  }, [back]);

  const handleUnload = React.useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const handleInitialize = React.useCallback(() => {
    setIsInitialize(true);
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
    const instance = editor.current?.getInstance();
    const html = instance?.getHTML();

    if (!html) {
      throw 'editor contents is require';
    }

    const document = new DOMParser().parseFromString(html, 'text/html');
    const img = Array.from(document.querySelectorAll('img'));
    const isImg = img.length > 0;
    const isTempImg = initialData.images && initialData.images.length > 0;
    const thumbnail = img[0]?.src || null;
    const isContents = Array.from(document.querySelectorAll('p')).some(
      (element) => element.innerText
    );

    if (!isContents) {
      setError('본문에 내용을 작성해주세요.');
      throw 'contents is require';
    }

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

  const uploadMutation = useMutation({
    mutationFn: async (data: FormState) =>
      handleRequire(data).then(async () => {
        setError(null);
        const { title, category, temporaryStorage, tempId } = data;
        const {
          addImgFiles,
          addImgSrcs,
          deleteImgSrcs,
          thumbnail,
          tempId: _tempId,
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
                tempId: tempId || _tempId,
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

        const url = temporaryStorage
          ? '/server/supercar/v1/community-temp'
          : '/server/supercar/v1/community';

        const response = await fetcher(url, {
          ...options,
          headers: {
            ACCESS_TOKEN: session.data?.accessToken || '',
          },
          params: id,
          body: formData,
        });

        const result = await response.json();

        if (!response.ok)
          setError(result.message || ErrorCode[response.status]);

        return {
          id: result.data.id,
          tempId: result.data.tempId,
          temporaryStorage,
        };
      }),
    onSuccess: async ({ id: _id, temporaryStorage }) => {
      if (temporaryStorage) {
        setSuccess(dayjs(new Date()).format('HH:mm'));
        return;
      }

      if (id)
        queryClient.refetchQueries({
          queryKey: queries.community.detail(
            category === 'information' ? 'library' : 'paparazzi',
            reverseFormatter(category),
            id
          ),
        });

      queryClient.invalidateQueries({
        queryKey: [
          ...queries.community.lists(),
          ...queries.community.query({
            category,
            filter: 'null',
            searchType: 'null',
            keyword: 'null',
            page: 0,
          }),
        ],
      });

      push(`${getCategoryPathname(reverseFormatter(category))}/${_id}`);
    },
  });

  const handleTemporaryStorage = React.useCallback(async () => {
    setSuccess(null);

    const data = {
      title: methods.getValues('title'),
      category: methods.getValues('category'),
      files: methods.getValues('files'),
      temporaryStorage: true,
    };

    uploadMutation.mutate(data);
  }, [methods, uploadMutation]);

  // * 임시저장 데이터 불러오기
  React.useEffect(() => {
    if (initialData.tempId && !id)
      onOpen(
        <Modal
          title="임시저장된 글이 있습니다. 불러오시겠습니까?"
          description="취소를 누르면 임시저장 글이 삭제되고\n새 글을 작성할 수 있습니다."
          closeText="취소"
          clickText="불러오기"
          onCancel={() => {
            onClose();
          }}
          onClick={() => {
            onClose();
            handleInitialize();
          }}
          onClose={() => {
            onClose();
          }}
        />
      );
  }, [handleInitialize, onClick, onClose, onOpen, initialData, id]);

  React.useEffect(() => {
    if (id) handleInitialize();
  }, [handleInitialize, id]);

  React.useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', handleUnload);
    })();

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <Form
        encType="multipart/form-data"
        onSubmit={methods.handleSubmit((data) => {
          uploadMutation.mutate({
            ...data,
            tempId: uploadMutation.data?.tempId,
          });
        })}
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
            width: 100%;
            display: flex;
            justify-content: ${success ? 'space-between' : 'flex-end'};
            align-items: center;
          `}
        >
          {success && (
            <Typography
              fontSize="body-16"
              fontWeight="regular"
              lineHeight="150%"
              color="greyScale-5"
            >
              {success} 임시저장 되었습니다.
            </Typography>
          )}
          <Wrapper.Item
            css={css`
              display: flex;
              gap: 9px;
            `}
          >
            <Button variant="Line" type="button" onClick={handleCancel}>
              취소
            </Button>
            {!id && (
              <Button
                variant="Line"
                type="button"
                onClick={handleTemporaryStorage}
              >
                임시저장
              </Button>
            )}
            <Button variant="Primary" type="submit">
              {id
                ? formState.isSubmitting
                  ? '수정 중..'
                  : '수정 완료'
                : formState.isSubmitting
                ? '작성 중..'
                : '작성 완료'}
            </Button>
          </Wrapper.Item>
        </Wrapper>
        {error && <Alert severity="error" title={error} />}
      </Form>
    </FormProvider>
  );
};

export default CommunityForm;
