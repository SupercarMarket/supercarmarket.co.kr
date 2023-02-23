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

interface CommunityFormProps {
  temporaryStorage: CommunityTemporaryStorageDto;
}

const CommunityEditor = dynamic(() => import('./communityEditor'), {
  ssr: false,
});

const CommunityForm = (props: CommunityFormProps) => {
  const { temporaryStorage } = props;

  const editor = React.useRef<InstanceType<typeof Editor>>(null);
  const [category, setCategory] = React.useState('');
  const { onClick, onClose, onOpen } = React.useContext(ModalContext);

  const handleInitEditor = React.useCallback(() => {
    const instance = editor.current?.getInstance();

    if (!instance) return;
    console.log('init editor');

    instance.removeHook('addImageBlobHook');
    instance.addHook('addImageBlobHook', (blob, dropImage) => {
      const local = URL.createObjectURL(blob);
      console.log('local : ', local);
      dropImage(local, `alt_type`);
    });
  }, []);

  React.useEffect(() => {
    if (temporaryStorage.tempId)
      onOpen(
        <TemporaryStorageModal
          onClick={onClick}
          onClose={onClose}
          onOpen={onOpen}
        />
      );
  }, [onClick, onClose, onOpen, temporaryStorage]);

  /**
   * @todo
   * 임시저장 이미지가 모두 삭제된 경우
   * 임시저장 이미지가 일부만 삭제된 경우
   * 임시저장 이미지가 삭제되지 않은 경우
   */

  return (
    <Form
      css={css`
        display: flex;
        flex-direction: column;
        gap: 24px;
        z-index: 0;
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
      {category === '자료실' && (
        <FormLabel name="제목" label="제목" bold>
          <FormFiles />
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
          <Button variant="Primary" type="button">
            작성 완료
          </Button>
        </Wrapper.Item>
      </Wrapper>
    </Form>
  );
};

export default CommunityForm;
