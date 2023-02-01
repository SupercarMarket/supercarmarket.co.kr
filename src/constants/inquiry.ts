import type { FormSelectOption } from 'components/common/form/formSelect';
import * as React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import type { InquiryLink } from 'types/inquiry';

interface InquiryDealerFormState {
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

interface InquiryCarFormState {
  배기량: string;
}

interface InquiryRegister {
  htmlFor: string;
  type:
    | 'text'
    | 'file'
    | 'files'
    | 'image'
    | 'images'
    | 'address'
    | 'textarea'
    | 'agreement'
    | 'radioGroup'
    | 'range'
    | 'select'
    | 'mixed';
  label?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  divider?: boolean;
  options: RegisterOptions & {
    option?: FormSelectOption;
  };
  tooltip?: string;
  errorMessage?: string;
  callback?: (data: unknown) => void;
}

const inquiry = {
  links: [
    {
      title: '딜러 등록 문의',
      link: '/inquiry/dealer',
    },
    {
      title: '판매차량 등록 문의',
      link: '/inquiry/market',
      description: '판매차량 등록 문의는 딜러 등록을 완료한 후에 가능합니다.',
    },
    {
      title: '제휴업체 등록 문의',
      link: '/inquiry/partnership',
    },
    {
      title: '광고 문의',
      link: '/inquiry/advertisement',
    },
    {
      title: '기타 문의',
      link: '/inquiry/misc',
    },
  ] as InquiryLink[],
  register: {
    dealer: [
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
        placeholder: '조합명을 선택해주세요.',
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
    ] as InquiryRegister[],
    car: [
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
        type: 'select',
        placeholder: '선택하세요',
        suffix: 'text',
        options: {
          option: {
            name: '형식연도',
            values: ['2006', '2011', '2018'],
          },
          required: true,
        },
      },
      {
        htmlFor: 'fuel',
        label: '연료',
        type: 'text',
        placeholder: '선택하세요',
        options: {
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
        htmlFor: 'subtitle',
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
        htmlFor: 'attchments',
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
    ] as InquiryRegister[],
  },
};

export type { InquiryCarFormState, InquiryDealerFormState, InquiryRegister };
export default inquiry;
