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
  type: 'text' | 'file' | 'files' | 'image' | 'address' | 'textarea';
  label?: string;
  placeholder?: string;
  suffix?: React.ReactNode;
  divider?: boolean;
  options: RegisterOptions;
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
        htmlFor: '차량정보',
        label: '차량정보',
        type: 'text',
        placeholder: '예) 123가1234',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '차종',
        label: '차종',
        type: 'text',
        placeholder: '선택하세요',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '차량명',
        label: '차량명',
        type: 'text',
        placeholder: '',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '브랜드',
        label: '브랜드',
        type: 'text',
        placeholder: '',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '모델',
        label: '모델',
        type: 'text',
        placeholder: '',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '변속기',
        label: '변속기',
        type: 'text',
        placeholder: '',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '연식',
        label: '연식 (최초 등록일)',
        type: 'text',
        placeholder: '',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '형식연도',
        label: '형식연도',
        type: 'text',
        placeholder: '선택하세요',
        suffix: '년도',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '연료',
        label: '연료',
        type: 'text',
        placeholder: '선택하세요',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '배기량',
        label: '배기량',
        type: 'text',
        placeholder: '내용을 입력해주세요',
        suffix: 'CC',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '주행거리',
        label: '주행거리',
        type: 'text',
        placeholder: '내용을 입력해주세요',
        suffix: 'km',
        options: {
          required: true,
        },
      },
      {
        htmlFor: '색상',
        label: '색상',
        type: 'text',
        placeholder: '내용을 입력해주세요',
        options: {
          required: true,
        },
      },
    ] as InquiryRegister[],
  },
};

export type { InquiryCarFormState, InquiryDealerFormState, InquiryRegister };
export default inquiry;
