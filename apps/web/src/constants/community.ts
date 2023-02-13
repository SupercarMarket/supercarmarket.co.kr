import type { Links } from '@supercarmarket/types/base';

const community = {
  links: [
    {
      title: '파파라치',
      href: '/community/paparazzi',
      children: [
        { title: '제보', href: '/community/paparazzi' },
        { title: '포토갤러리', href: '/community/paparazzi' },
        { title: '내 차 자랑', href: '/community/paparazzi' },
      ],
    },
    {
      title: '자료실',
      href: '/community/reference-room',
      children: [{ title: '차량 정보', href: '/community/reference-room' }],
    },
  ] as Links[],
};

export default community;
