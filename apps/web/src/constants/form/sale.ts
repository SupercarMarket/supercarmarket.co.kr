import { Form, FormType } from '.';

export interface FormState {
  title: string;
  carNumber: string;
  subTitle: string;
  category: string;
  model: string;
  brand: string;
  regDate: string;
  year: string;
  sellType: string;
  fuel: string;
  cc: string;
  mileage: string;
  color: string;
  accidentHistory: string;
  price: string;
  contents: string;
  transmissionType: string;
  sellClause: boolean;
  personalInfoAgree: boolean;
  productImages: Array<{ file: File; thumbnail: string }>;
  attachments: File[];
}

export const form = [
  {
    htmlFor: 'carNumber',
    label: '차량정보',
    type: 'text',
    placeholder: '예) 123가1234',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'category',
    label: '차종',
    type: 'select',
    placeholder: '선택하세요',
    options: {
      option: {
        name: '차종',
        values: ['스포츠카', '세단', 'SUV', '픽업트럭', '클래식카&올드카'],
      },
      required: true,
    },
  },
  {
    htmlFor: 'title',
    label: '차량명',
    type: 'text',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'brand',
    label: '브랜드',
    type: 'text',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'model',
    label: '모델',
    type: 'text',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'transmissionType',
    label: '변속기',
    type: 'text',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'year',
    label: '연식 (최초 등록일)',
    type: 'text',
    placeholder: '',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'regDate',
    label: '형식연도',
    type: 'text',
    suffix: '년도',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'fuel',
    label: '연료',
    type: 'select',
    placeholder: '선택하세요',
    options: {
      option: {
        name: '연료',
        values: ['가솔린', '디젤', '전기'],
      },
      required: true,
    },
  },
  {
    htmlFor: 'cc',
    label: '배기량',
    type: 'text',
    placeholder: '내용을 입력해주세요',
    suffix: 'CC',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'mileage',
    label: '주행거리',
    type: 'text',
    placeholder: '내용을 입력해주세요',
    suffix: 'km',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'color',
    label: '색상',
    type: 'text',
    placeholder: '내용을 입력해주세요',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'accidentHistory',
    label: '사고여부',
    type: 'radioGroup',
    placeholder: '내용을 입력해주세요',
    options: {
      option: {
        name: 'accidentHistory',
        values: ['무사고', '사고'],
      },
      required: true,
    },
  },
  {
    htmlFor: 'sellType',
    label: '판매형태',
    type: 'select',
    placeholder: '내용을 입력해주세요',
    options: {
      option: {
        name: '판매형태',
        values: ['매매', '승계', '기타'],
      },
      required: true,
    },
  },
  {
    htmlFor: 'price',
    label: '판매가격',
    type: 'mixed',
    placeholder: '내용을 입력해주세요',
    suffix: '만원',
    divider: true,
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'subTitle',
    label: '부제목',
    type: 'text',
    placeholder: '넣고싶은 정보를 입력해주세요. 예) 무사고, 짧은 주행',
    divider: true,
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'contents',
    label: '차량 설명글 입력',
    type: 'textarea',
    placeholder: '내용을 입력해주세요',
    divider: true,
    options: {
      required: false,
    },
  },
  {
    htmlFor: 'productImages',
    label: '사진 등록',
    type: 'images',
    placeholder: '내용을 입력해주세요',
    divider: true,
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'attachments',
    label: '첨부파일',
    type: 'files',
    placeholder: '내용을 입력해주세요',
    tooltip: '사진은 20장까지만 첨부 가능합니다.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'sellClause',
    label: '판매약관',
    type: 'agreement',
    placeholder: '내용을 입력해주세요',
    tooltip: '판매약관 내용에 동의합니다.',
    options: {
      required: true,
    },
  },
  {
    htmlFor: 'personalInfoAgree',
    label: '개인정보 수집 이용',
    type: 'agreement',
    placeholder: '내용을 입력해주세요',
    tooltip: '개인정보 수집 이용에 동의합니다.',
    options: {
      required: true,
    },
  },
] as Form<
  keyof FormState,
  Extract<FormType, 'text' | 'password' | 'tel' | 'email' | 'agreement'>
>[];
