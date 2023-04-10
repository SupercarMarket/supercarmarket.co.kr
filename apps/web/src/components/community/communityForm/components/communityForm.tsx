import {
  Alert,
  applyMediaQuery,
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
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorCode } from '@supercarmarket/lib';
import {
  formatter,
  getCategoryPathname,
  reverseFormatter,
} from '../../communityCard/communityCard';
import dayjs from 'dayjs';
import { Modal } from 'components/common/modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/community';
import { useDebounce } from '@supercarmarket/hooks';
import { authRequest } from 'http/core';
import { ServerResponse } from '@supercarmarket/types/base';
import { ModalContext } from 'feature/ModalProvider';

interface FormState {
  files: File[];
  category: string;
  title: string;
  temporaryStorage?: boolean;
  tempId?: string;
}

interface CommunityFormProps {
  initialData: Community.CommunityTemporaryStorageDto;
  sub?: string;
  id?: string;
}

interface CommunityFormEditorImages {
  file: File;
  local: string;
}

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const CommunityForm = (props: CommunityFormProps) => {
  const { sub, id, initialData: _initialData } = props;

  const { back, push } = useRouter();
  const [initialData, setInitialData] =
    React.useState<Community.CommunityTemporaryStorageDto>(_initialData);
  const [category, setCategory] = React.useState('');
  const [isInitialize, setIsInitialize] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const editor = React.useRef<InstanceType<typeof Editor>>(null);
  const [images, setImages] = React.useState<CommunityFormEditorImages[]>([]);
  const { onClose, onOpen } = React.useContext(ModalContext);
  const methods = useForm<FormState>();
  const queryClient = useQueryClient();

  const handleCancel = React.useCallback(() => {
    back();
  }, [back]);

  const handleUnload = React.useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const handleInitialize = React.useCallback(
    (data: Community.CommunityTemporaryStorageDto) => {
      setIsInitialize(true);
      const instance = editor.current?.getInstance();

      if (instance && data.contents) instance.setHTML(data.contents);

      if (data.images?.length > 0)
        setImages(() =>
          data.images.map((i) => ({
            file: new File([i], i),
            local: i,
          }))
        );

      methods.setValue('title', data.title);

      setInitialData(data);
      onClose();
    },
    [methods, onClose]
  );

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
  }, [id, initialData]);

  const handleEditorHtml = React.useCallback(async () => {
    const instance = editor.current?.getInstance();
    const html = instance?.getHTML();

    if (!html) {
      throw 'editor contents is require';
    }

    const document = new DOMParser().parseFromString(html, 'text/html');
    const img = Array.from(document.querySelectorAll('img'));
    const isImg = img.length > 0;
    const isTempImg =
      initialData && initialData.images && initialData.images.length > 0;
    const thumbnail = img[0]?.src || null;
    const isContents = Array.from(document.querySelectorAll('p')).some(
      (element) => element.innerText
    );

    if (!isContents && !isImg) {
      setError('본문에 내용을 작성해주세요.');
      throw 'contents is require';
    }

    let addImgSrcs: string[] = [];
    let deleteImgSrcs: string[] = [];
    let addImgFiles: File[] = [];

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
      addImgSrcs = addImg.map((i) => i.local) || [];
      addImgFiles = addImg.map((i) => i.file) || [];
    }

    return {
      tempId: initialData?.tempId || null,
      thumbnail,
      deleteImgSrcs,
      addImgSrcs,
      addImgFiles,
      html,
    };
  }, [images, initialData, isInitialize]);

  const handleFiles = React.useCallback(
    async (data: FormState) => {
      const { files } = data;

      const isLibrary = initialData?.category === 'information' || null;
      const isSelecteLibrary = category === '차량 정보';

      let addFiles = null;
      let deleteFileSrcs: string[] = [];

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
          deleteFileSrcs = initialData?.files?.map((file) => file.url) || [];
        }

        // * case 2-2
        // * 임시저장 카테고리가 자료실이고 선택한 카테고리가 자료실인 경우
        if (isLibrary && isSelecteLibrary) {
          deleteFileSrcs = currentTempFiles
            .filter((file) => !files.some((f) => f.name === file.name))
            .map((file) => file.url);
          addFiles = files.filter(
            (file) => !currentTempFiles.some((f) => f.name === file.name)
          );
        }
      }

      return {
        addFiles,
        deleteFileSrcs,
      };
    },
    [category, initialData, isInitialize]
  );

  const handleRequire = React.useCallback(async (data: FormState) => {
    setSuccess(null);
    setError(null);

    const { title, category } = data;

    if (!title) {
      setError('제목을 입력해주세요.');
      throw 'title is require';
    }

    if (!category) {
      setError('카테고리를 선택해주세요.');
      throw 'category is require';
    }
  }, []);

  const uploadMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const { title, category, temporaryStorage, tempId } = data;
      const {
        addImgFiles,
        addImgSrcs,
        deleteImgSrcs,
        thumbnail,
        tempId: _tempId,
        html,
      } = await handleEditorHtml();
      const { addFiles, deleteFileSrcs } = await handleFiles(data);

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
              tempId: isInitialize ? tempId || _tempId : null,
              deleteImgSrcs,
              deleteFileSrcs,
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

      const options = id ? { method: 'PATCH' } : { method: 'POST' };

      const url = temporaryStorage ? `/community-temp` : '/community';

      const result = await authRequest<
        ServerResponse<{ id: string; tempId: string }>,
        ServerResponse<{ id: string; tempId: string }>
      >(id ? `${url}/${id}` : url, {
        ...options,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }).catch((error) => {
        setError(error.message || ErrorCode[error.status]);
      });

      if (!result) throw '';

      return {
        id: result.data?.id,
        tempId: result.data?.tempId,
        temporaryStorage,
      };
    },
    onSuccess: async ({ id: _id, temporaryStorage }) => {
      if (temporaryStorage) {
        setIsInitialize(true);
        setSuccess(dayjs(new Date()).format('HH:mm'));
        queryClient.refetchQueries(QUERY_KEYS.temporaryStorage(sub ?? ''));
        return;
      } else {
        queryClient.removeQueries({
          queryKey: QUERY_KEYS.temporaryStorage(sub ?? ''),
        });
      }

      if (id)
        queryClient.refetchQueries({
          queryKey: [
            ...QUERY_KEYS.id(id),
            {
              subject: category === 'information' ? 'library' : 'paparazzi',
              category: reverseFormatter(category),
            },
          ],
        });

      queryClient.refetchQueries({
        queryKey: [
          ...QUERY_KEYS.community(),
          {
            category: reverseFormatter(category),
            page: 0,
            filter: undefined,
            searchType: undefined,
            keyword: undefined,
          },
        ],
      });

      push(`${getCategoryPathname(reverseFormatter(category))}/${_id}`);
    },
  });

  const debouncedUploadMutation = useDebounce((data: FormState) => {
    uploadMutation.mutate(data);
  }, 500);

  const handleTemporaryStorage = React.useCallback(
    async (data: FormState) => {
      debouncedUploadMutation(data);
    },
    [debouncedUploadMutation]
  );

  // * 임시저장 데이터 불러오기
  React.useEffect(() => {
    if (_initialData && _initialData.tempId && !id)
      onOpen(
        <Modal
          title="임시저장된 글이 있습니다. 불러오시겠습니까?"
          description={`취소를 누르면 임시저장 글이 삭제되고\n새 글을 작성할 수 있습니다.`}
          closeText="취소"
          clickText="불러오기"
          onCancel={() => {
            onClose();
          }}
          onClick={() => {
            onClose();
            handleInitialize(_initialData);
          }}
          onClose={() => {
            onClose();
          }}
        />
      );
  }, []);

  React.useEffect(() => {
    if (id) handleInitialize(_initialData);
  }, []);

  React.useEffect(() => {
    if (isInitialize) handleInitialize(_initialData);
  }, [handleInitialize, _initialData]);

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
        onSubmit={methods.handleSubmit((data) =>
          handleRequire(data).then(() => {
            debouncedUploadMutation({
              ...data,
              tempId: uploadMutation.data?.tempId,
            });
          })
        )}
        css={css`
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 0;
          ${applyMediaQuery('mobile')} {
            .toastui-editor-popup {
              margin-left: 0 !important;
            }
          }
        `}
      >
        <FormLabel name="category" label="카테고리" bold>
          <FormSelect
            name="category"
            option={{
              name: 'community',
              values: ['제보', '포토갤러리', '내 차 자랑', '차량 정보'],
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
            disabled={!!id}
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
        {category === '차량 정보' && (
          <FormLabel name="files" label="첨부파일" bold>
            <FormFiles
              name="files"
              defaultValues={
                isInitialize &&
                initialData.category === 'information' &&
                initialData.files &&
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
            ${applyMediaQuery('mobile')} {
              flex-direction: column;
              align-items: flex-end;
              gap: 9px;
            }
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
                onClick={() => {
                  const data = {
                    title: methods.getValues('title'),
                    category: methods.getValues('category'),
                    files: methods.getValues('files'),
                    temporaryStorage: true,
                    tempId: uploadMutation.data?.tempId,
                  };
                  handleRequire(data).then(() => {
                    handleTemporaryStorage(data);
                  });
                }}
                disabled={uploadMutation.isLoading}
              >
                {uploadMutation.isLoading ? '임시저장 중..' : '임시저장'}
              </Button>
            )}
            <Button
              variant="Primary"
              type="submit"
              disabled={uploadMutation.isLoading}
            >
              {id
                ? uploadMutation.isLoading
                  ? '수정 중..'
                  : '수정 완료'
                : uploadMutation.isLoading
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
