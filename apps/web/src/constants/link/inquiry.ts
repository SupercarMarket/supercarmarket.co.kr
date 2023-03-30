import { type Links } from '.';

export const links = [
  {
    title: '딜러 등록 문의',
    href: '/inquiry/dealer',
  },
  {
    title: '판매차량 등록 문의',
    href: '/inquiry/market',
    description: '판매차량 등록 문의는 딜러 등록을 완료한 후에 가능합니다.',
  },
  {
    title: '제휴업체 등록 문의',
    href: '/inquiry/partnership',
  },
  {
    title: '광고 문의',
    href: '/inquiry/advertisement',
  },
  {
    title: '기타 문의',
    href: '/inquiry/misc',
  },
] as (Links & { description?: string })[];
