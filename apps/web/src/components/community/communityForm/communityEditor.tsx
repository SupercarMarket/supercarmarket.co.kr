import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import { Editor } from '@toast-ui/react-editor';
import type { EditorProps } from '@toast-ui/react-editor';
import * as React from 'react';

interface CommunityEditorProps {
  editor: React.Ref<InstanceType<typeof Editor>>;
  plugins?: EditorProps['plugins'];
  init?: () => void;
}

const CommunityEditor = (props: CommunityEditorProps) => {
  const { editor, plugins, init } = props;

  React.useEffect(() => {
    if (init) init();
  }, []);

  return (
    <Editor
      ref={editor}
      placeholder="내용을 입력해주세요."
      usageStatistics={false}
      height="800px"
      initialEditType="wysiwyg"
      initialValue=" "
      language="ko-KR"
      toolbarItems={[
        ['bold', 'strike'],
        ['hr'],
        ['image', 'link'],
        ['code', 'codeblock'],
      ]}
      plugins={plugins}
      hideModeSwitch
    />
  );
};

export default CommunityEditor;
