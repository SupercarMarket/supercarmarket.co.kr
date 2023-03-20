import type { Links } from '@supercarmarket/types/base';

interface FormState {
  files: File[];
  category: string;
  title: string;
  temporaryStorage?: boolean;
  tempId?: string;
}

const community = {
  links: [
    {
      title: '파파라치',
      href: '/community/paparazzi',
      children: [
        { title: '제보', href: 'report' },
        { title: '포토갤러리', href: 'gallery' },
        { title: '내 차 자랑', href: 'boast' },
      ],
    },
    {
      title: '자료실',
      href: '/community/library',
      children: [{ title: '차량 정보', href: 'information' }],
    },
  ] as Links[],
};

export type { FormState };
export default community;
