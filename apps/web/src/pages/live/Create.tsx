/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { Button, Container, Input, Title, Wrapper } from '@supercarmarket/ui';
import Layout from 'components/layout';
import { css } from 'styled-components';
import { authRequest } from 'http/core';
import { useRouter } from 'next/router';
import TagCloseBtn from 'public/images/live/icons/TagCloseBtn.svg';

interface Props {}

interface broadcastDataType {
  title: string;
  tags: string[];
  isPrivate: boolean;
  password?: string;
}

const Create = (props: Props) => {
  const [broadcastData, setBroadcastData] = useState<broadcastDataType>({
    title: '',
    tags: [],
    isPrivate: true,
  });
  const [filePath, setfilePath] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const tagsRef = useRef<HTMLInputElement | null>(null);
  const imageFileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const broadcastStateChangeHandler = (
    target: 'title' | 'isPrivate' | 'password',
    value: string | string[] | boolean
  ) => {
    setBroadcastData((prevState) => {
      return {
        ...prevState,
        [target]: value,
      };
    });
  };

  const addTagsHandler = (tag: string) => {
    console.log(broadcastData.tags.length);
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

  const fileuploadButtonHandler = () => {
    imageFileRef.current?.click();
  };

  const fileChangeHandler = () => {
    const target = URL.createObjectURL(
      (
        (document.getElementById('thumbnail') as HTMLInputElement)
          .files as FileList
      )[0]
    );
    setfilePath(target);
  };

  const createBroadCastRoom = async () => {
    if (broadcastData.isPrivate && !broadcastData.password) {
      alert('비밀번호를 설정해주세요');
    }
    const sessionId = await getSessionId();
    console.log(sessionId);

    const params = {
      ...broadcastData,
      sessionId: sessionId,
    };

    const formData = new FormData();

    formData.append(
      'addBroadCastDto',
      new Blob([JSON.stringify(params)], { type: 'application/json' })
    );
    formData.append(
      'file',
      (
        (document.getElementById('thumbnail') as HTMLInputElement)
          .files as FileList
      )[0]
    );

    const data = await authRequest.post(`/live`, formData);

    console.log(data);
    router.push(`${data.data.bcSeq}`);
  };

  useEffect(() => {
    if (broadcastData.isPrivate) {
      (passwordRef.current as HTMLInputElement).style.display = 'block';
    } else {
      (passwordRef.current as HTMLInputElement).style.display = 'none';
    }
  }, [broadcastData]);

  return (
    <Container>
      <Wrapper
        css={css`
          padding-bottom: 40px;
        `}
      >
        <div style={{ display: 'flex', marginTop: '40px' }}>
          <Title>라이브 시작하기</Title>
        </div>
        <div style={{ padding: '10px' }}>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              height: '45px',
            }}
          >
            <div>제목&nbsp;&nbsp;</div>
            <div>
              <Input
                onChange={(event) => {
                  broadcastStateChangeHandler(
                    'title',
                    event.currentTarget.value
                  );
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              height: '45px',
            }}
          >
            <div>태그&nbsp;&nbsp;</div>
            <div>
              <Input ref={tagsRef} />
            </div>
            <div style={{ marginLeft: '8px' }}>
              <Button
                onClick={() => {
                  addTagsHandler(tagsRef.current?.value as string);
                }}
              >
                추가
              </Button>
            </div>
          </div>
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
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
              height: '45px',
            }}
          >
            <div>공개여부&nbsp;&nbsp;</div>
            <div>
              <input
                type="radio"
                id="public"
                name="publicType"
                onChange={(event) => {
                  broadcastStateChangeHandler('isPrivate', false);
                }}
                checked={!broadcastData.isPrivate}
              />
              <label htmlFor="public">공개</label>
              <input
                type="radio"
                id="private"
                name="publicType"
                onChange={(event) => {
                  broadcastStateChangeHandler('isPrivate', true);
                }}
                checked={broadcastData.isPrivate}
              />
              <label htmlFor="private">비공개</label>
            </div>
            <div style={{ marginLeft: '5px' }}>
              <Input
                id="broadcastPassword"
                placeholder="비밀번호를 입력해주세요"
                onChange={(event) => {
                  broadcastStateChangeHandler(
                    'password',
                    event.currentTarget.value
                  );
                }}
                ref={passwordRef}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          >
            <div>썸네일&nbsp;&nbsp;</div>
            <div>
              <Button onClick={fileuploadButtonHandler}>사진 추가</Button>
              <input
                type="file"
                id="thumbnail"
                style={{ display: 'none' }}
                ref={imageFileRef}
                onChange={fileChangeHandler}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          >
            <img src={filePath ?? ''} alt="" />
          </div>
        </div>

        <Button
          variant="Line"
          style={{
            width: '145px',
            height: '44px',
            color: '#B79F7B',
            border: '1px solid #B79F7B',
          }}
          onClick={createBroadCastRoom}
        >
          시작하기
        </Button>
      </Wrapper>
    </Container>
  );
};

export default Create;

const getSessionId = async () => {
  const data = await axios.post(
    `${process.env.NEXT_PUBLIC_OPENVIDU_API_URL}/openvidu/api/sessions`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          process.env.NEXT_PUBLIC_OPENVIDU_SECRET as string,
          'utf8'
        ).toString('base64')}`,
      },
    }
  );
  return data.data.id;
};

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
