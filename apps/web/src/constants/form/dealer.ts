import { Form, FormType } from '.';

export interface FormState {
  comName: string;
  comPhone: string;
  comAddress: [string, string, string];
  comRegNum: string;
  regImage: File[];
  guildName: string;
  dlrNum: string;
  employeeCardFront: File[];
  employeeCardBack: File[];
  profileImage: File[];
  addional: string;
}

export const form = [
  {
    htmlFor: 'comName',
    label: '상사명',
    type: 'text',
    placeholder: '상사명을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'comPhone',
    label: '상사 전화번호',
    type: 'text',
    placeholder: '‘-’ 없이 숫자만 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'comAddress',
    label: '상사 주소',
    type: 'address',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'comRegNum',
    label: '상사 사업자 등록번호',
    type: 'text',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'regImage',
    label: '사업자 등록증 사본',
    type: 'file',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'guildName',
    label: '조합명',
    type: 'text',
    placeholder: '조합명을 입력해주세요.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'dlrNum',
    label: '사원증 번호',
    type: 'text',
    placeholder: '예) 11-123-12345, 050-12345',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'employeeCardFront',
    label: '사원증 사진 앞면',
    type: 'file',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'employeeCardBack',
    label: '사원증 사진 뒷면',
    type: 'file',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'profileImage',
    label: '프로필 사진',
    type: 'file',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'addional',
    label: '추가 전달 내용 (선택)',
    type: 'textarea',
    placeholder: '내용을 입력해주세요',
    options: {
      required: false,
    },
  },
] as Form<keyof FormState, Exclude<FormType, 'tel' | 'email' | 'password'>>[];
