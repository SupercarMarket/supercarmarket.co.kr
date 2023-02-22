import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import * as React from 'react';

interface CommunityEditorProps {
  editor: React.Ref<InstanceType<typeof Editor>>;
  init?: () => void;
}

const CommunityEditor = (props: CommunityEditorProps) => {
  const { editor, init } = props;

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
      language="ko"
      toolbarItems={[
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['image', 'link'],
        ['code', 'codeblock'],
      ]}
      hideModeSwitch
    />
  );
};

export default CommunityEditor;
