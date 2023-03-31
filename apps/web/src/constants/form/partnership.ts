import { Form, FormType } from '.';

export interface FormState {
  title: string;
  representative: string;
  tel: string;
  phone: string;
  workTime: string;
  introduction: string;
  category: string;
  treatedItem: string;
  address: string[];
  siteUrl: string;
  partnershipPhotoAttachment: Array<{ file: File; thumbnail: string }>;
  partnershipAttachment: File[];
}

export const form = [
  {
    htmlFor: 'title',
    label: '업체 상호',
    type: 'text',
    placeholder: '상호를 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'representative',
    label: '대표자',
    type: 'text',
    placeholder: '대표자 성함을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'tel',
    label: '업체 전화번호',
    type: 'tel',
    placeholder: '‘-’ 없이 숫자만 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'phone',
    label: '휴대폰',
    type: 'tel',
    placeholder: '‘-’ 없이 숫자만 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'workTime',
    label: '업무 시간',
    type: 'text',
    placeholder: '예) 평일 09:00~18:00',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'category',
    label: '업종 선택',
    type: 'select',
    placeholder: '',
    options: {
      option: {
        name: '업종 선택',
        values: ['자동차매장', '공업사', '디테일링', '도색', '기타'],
      },
      required: true,
    },
  },
  {
    htmlFor: 'treatedItem',
    label: '취급 품목',
    type: 'text',
    placeholder: '취급 품목을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'address',
    label: '업체 주소',
    type: 'address',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'siteUrl',
    label: '홈페이지 주소',
    type: 'text',
    placeholder: 'https://...',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'partnershipAttachment',
    label: '첨부파일',
    type: 'file',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'introduction',
    label: '업체 소개',
    type: 'textarea',
    placeholder: '내용을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'partnershipPhotoAttachment',
    label: '업체 사진',
    type: 'images',
    placeholder: '내용을 입력해주세요.',
    options: {
      required: true,
    },
  },
] as Form<keyof FormState, Exclude<FormType, 'tel' | 'email' | 'password'>>[];
