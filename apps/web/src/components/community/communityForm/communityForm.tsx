import {
  Button,
  Form,
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

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const CommunityForm = () => {
  const editor = React.useRef<InstanceType<typeof Editor>>(null);

  const handleInitEditor = React.useCallback(() => {
    const instance = editor.current?.getInstance();

    if (!instance) return;

    instance.removeHook('addImageBlobHook');
    instance.addHook('addImageBlobHook', (blob, dropImage) => {
      const local = URL.createObjectURL(blob);
      console.log('local : ', local);
      dropImage(local, `alt_type`);
    });
  }, []);

  return (
    <Form
      css={css`
        display: flex;
        flex-direction: column;
        gap: 24px;
      `}
    >
      <FormLabel name="카테고리" label="카테고리" bold>
        <FormSelect
          option={{
            name: 'community',
            values: ['제보'],
          }}
        />
      </FormLabel>
      <FormLabel name="제목" label="제목" bold>
        <FormInput placeholder="제목을 입력해주세요." />
      </FormLabel>
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
          <Button variant="Primary" type="button">
            작성 완료
          </Button>
        </Wrapper.Item>
      </Wrapper>
    </Form>
  );
};

export default CommunityForm;
