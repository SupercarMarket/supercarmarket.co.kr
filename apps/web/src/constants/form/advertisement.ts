import { Form, FormType } from '.';

export interface FormState {
  files: File[];
  title: string;
  url: string;
  contents: string;
}

export const form = [
  {
    htmlFor: 'title',
    label: '제목',
    type: 'text',
    placeholder: '제목을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'url',
    label: '관련 링크',
    type: 'text',
    placeholder: 'https://...',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'files',
    label: '첨부파일',
    type: 'file',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'contents',
    label: '내용',
    type: 'textarea',
    placeholder: '내용을 입력해주세요.',
    options: {
      required: true,
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
