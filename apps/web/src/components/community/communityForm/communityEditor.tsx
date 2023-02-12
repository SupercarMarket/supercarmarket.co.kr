import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import * as React from 'react';

const CommunityEditor = () => {
  const editor = React.useRef<InstanceType<typeof Editor>>(null);

  React.useEffect(() => {
    const instance = editor.current?.getInstance();

    instance?.setHTML('');
  }, []);
  return (
    <Editor
      ref={editor}
      placeholder="내용을 입력해주세요."
      usageStatistics={false}
    />
  );
};

export default CommunityEditor;
