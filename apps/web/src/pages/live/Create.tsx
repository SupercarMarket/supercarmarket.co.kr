/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  Button,
  Container,
  Form,
  FormAttachment,
  FormInput,
  FormLabel,
  FormMessage,
  FormRadio,
  FormRadioGroup,
  Title,
  Wrapper,
  applyMediaQuery,
} from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { useRouter } from 'next/router';
import TagCloseBtn from 'public/images/live/icons/TagCloseBtn.svg';
import { checkIsMakeRoom, getOpenViduSessionId } from 'http/server/live';
import { useCreateBroadCastRoom } from 'http/server/live/mutaitons';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from 'http/server/live/keys';
import { type NextPageWithLayout } from '@supercarmarket/types/base';
import { useForm } from 'react-hook-form';
import { FormState } from 'constants/form/live';

interface broadcastDataType {
  tags: string[];
}

const Create: NextPageWithLayout = () => {
  const [broadcastData, setBroadcastData] = React.useState<broadcastDataType>({
    tags: [],
  });

  const tagsRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const methods = useForm<FormState>();
  const show = methods.watch('show');

  const queryClient = useQueryClient();
  const createBroadCastRoomMutation = useCreateBroadCastRoom();

  const addTagsHandler = (tag: string) => {
    if (broadcastData.tags.length < 0) {
      alert('태그란이 비어있습니다.');
    }
    if (broadcastData.tags.length > 2 || tag.length > 6) {
      alert('태그는 최대 6자, 3개까지만 등록이 가능합니다');
      return null;
    } else {
      setBroadcastData((prevState) => {
        return {
          ...prevState,
          tags: prevState.tags.concat([tag]),
        };
      });
    }
  };

  const deleteTagsHandler = (index: number) => {
    setBroadcastData((prevState) => {
      return {
        ...prevState,
        tags: broadcastData.tags.filter((data, idx) => {
          if (idx === index) return false;
          return true;
        }),
      };
    });
  };

  const createBroadCastRoom = async (data: FormState) => {
    const { title, file, show, password } = data;

    if (!show) {
      alert('공개 여부를 설정해주세요');
      return;
    }

    if (show === '비공개' && !password) {
      alert('비밀번호를 설정해주세요');
      return;
    }

    if (!file.length) {
      alert('썸네일을 추가해주세요');
      return;
    }

    const sessionId = await getOpenViduSessionId();

    const params = {
      ...broadcastData,
      title,
      isPrivate: show === '공개' ? false : true,
      password,
      sessionId: sessionId,
    };

    const formData = new FormData();

    formData.append(
      'addBroadCastDto',
      new Blob([JSON.stringify(params)], { type: 'application/json' })
    );

    file.forEach((f) => formData.append('file', f));

    createBroadCastRoomMutation.mutate(formData, {
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.live() });
        router.push(`${result.data.bcSeq}`);
      },
    });
  };

  React.useEffect(() => {
    methods.setValue('password', '');
  }, [show]);

  return (
    <Container>
      <Form
        encType="multipart/form-data"
        onSubmit={methods.handleSubmit((data) => {
          createBroadCastRoom(data);
        })}
      >
        <div
          style={{ display: 'flex', marginTop: '40px', marginBottom: '40px' }}
        >
          <Title>라이브 시작하기</Title>
        </div>
        <Wrapper
          css={css`
            display: flex;
            flex-direction: column;
            gap: 24px;
          `}
        >
          <FormLabel name="title" label="제목" bold>
            <Wrapper.Item
              css={css`
                width: 400px;
                display: flex;
                flex-direction: column;
                gap: 8px;
                ${applyMediaQuery('mobile')} {
                  width: 328px;
                }
              `}
            >
              <FormInput
                id="title"
                type="text"
                {...methods.register('title', { required: true })}
              />
              <FormMessage tooltip="제목은 최대 20자까지 입력 가능합니다." />
            </Wrapper.Item>
          </FormLabel>
          <FormLabel name="tags" label="태그" bold>
            <Wrapper.Item
              css={css`
                display: flex;
                width: 400px;
                flex-direction: column;
                gap: 8px;
                button > span {
                  color: black !important;
                }
                ${applyMediaQuery('mobile')} {
                  width: 328px;
                }
              `}
            >
              <FormInput
                ref={tagsRef}
                type="text"
                button
                buttonWidth={72}
                buttonVariant="Line"
                buttonText="추가"
                buttonCallback={() => {
                  addTagsHandler(tagsRef.current?.value as string);
                }}
              />
              <FormMessage tooltip="태그는 최대 6자, 3개까지만 등록이 가능합니다." />
              {broadcastData.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    marginBottom: '10px',
                    alignItems: 'center',
                    height: '45px',
                  }}
                >
                  {broadcastData.tags.map((data, idx) => {
                    return (
                      <Tags
                        tags={data}
                        index={idx}
                        deleteTagsHandler={deleteTagsHandler}
                        key={`tag_${idx}`}
                      />
                    );
                  })}
                </div>
              )}
            </Wrapper.Item>
          </FormLabel>
          <FormLabel name="show" label="공개여부" bold>
            <Wrapper.Item
              css={css`
                width: 550px;
                display: flex;
                align-items: center;
                gap: 16px;
                ${applyMediaQuery('mobile')} {
                  width: 328px;
                  flex-direction: column;
                  align-items: unset;
                }
              `}
            >
              <FormRadioGroup
                name="show"
                options={['공개', '비공개']}
                callback={(value) => methods.setValue('show', value)}
              >
                {({ name, options, handleChange }) =>
                  options ? (
                    <Wrapper
                      css={css`
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        ${applyMediaQuery('mobile')} {
                          flex-direction: column;
                          align-items: unset;
                        }
                      `}
                    >
                      {options.map((value) => (
                        <FormRadio
                          name={name}
                          key={value}
                          id={value}
                          value={value}
                          onChange={handleChange}
                          content={value}
                        />
                      ))}
                    </Wrapper>
                  ) : (
                    <></>
                  )
                }
              </FormRadioGroup>
              {show === '비공개' && (
                <Wrapper
                  css={css`
                    flex: 1;
                  `}
                >
                  <FormInput
                    id="password"
                    type="text"
                    placeholder="비밀번호를 입력해주세요"
                    {...methods.register('password')}
                  />
                </Wrapper>
              )}
            </Wrapper.Item>
          </FormLabel>
          <FormLabel name="file" label="썸네일" bold>
            <FormAttachment
              size={1}
              id="file"
              name="file"
              accept="image/jpg, image/png, image/jpeg"
              title="사진추가"
              description=".jpeg .png 확장자만 업로드가 가능합니다."
              callback={(file) =>
                methods.setValue(
                  'file',
                  file.map((f) => f.file)
                )
              }
            />
          </FormLabel>
          <Wrapper.Item
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              width="fit-content"
              variant="Primary"
              type="submit"
              disabled={createBroadCastRoomMutation.isLoading}
            >
              시작하기
            </Button>
          </Wrapper.Item>
        </Wrapper>
      </Form>
    </Container>
  );
};

Create.Layout = Layout;

export default Create;

const Tags = ({
  tags,
  deleteTagsHandler,
  index,
}: {
  tags: string;
  deleteTagsHandler: (tag: number) => void;
  index: number;
}) => {
  const tagStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: '1px solid #C3C3C7',
    borderRadius: '20px',
    height: '14px',
    padding: '10px 22px',
    display: 'flex',
  };
  return (
    <div style={tagStyle}>
      {tags}
      <div
        onClick={() => deleteTagsHandler(index)}
        style={{ marginLeft: '2px', cursor: 'pointer' }}
      >
        <TagCloseBtn />
      </div>
    </div>
  );
};
