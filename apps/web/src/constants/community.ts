import type { Links } from '@supercarmarket/types/base';

const community = {
  links: [
    {
      title: '파파라치',
      href: '/community/paparazzi',
      children: [
        { title: '제보', href: '/community/paparazzi/report' },
        { title: '포토갤러리', href: '/community/paparazzi/gallery' },
        { title: '내 차 자랑', href: '/community/paparazzi/boast' },
      ],
    },
    {
      title: '자료실',
      href: '/community/library',
      children: [
        { title: '차량 정보', href: '/community/library/information' },
      ],
    },
  ] as Links[],
};

export default community;
