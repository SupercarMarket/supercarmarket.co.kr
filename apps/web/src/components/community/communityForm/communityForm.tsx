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
import { css } from 'styled-components';

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const CommunityForm = () => {
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
        <FormInput />
      </FormLabel>
      <CommunityEditor />
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
          <Button variant="Line">취소</Button>
          <Button variant="Line">임시저장</Button>
          <Button variant="Primary">작성 완료</Button>
        </Wrapper.Item>
      </Wrapper>
    </Form>
  );
};

export default CommunityForm;
