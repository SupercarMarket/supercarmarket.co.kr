import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import * as React from 'react';

const CommunityEditor = () => {
  return <Editor initialValue="" initialEditType="markdown" />;
};

export default CommunityEditor;
