import localFont from '@next/font/local';
import type { DefaultTheme } from 'styled-components';

export const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  preload: true,
  display: 'swap',
  variable: '--pretendard',
  fallback: [
    '../../public/fonts/Pretendard-Bold.woff',
    '../../public/fonts/Pretendard-Regular.woff',
  ],
});

const theme: DefaultTheme = {
  fontSize: {
    'header-36': '2.25rem',
    'header-24': '1.5rem',
    'header-20': '1.25rem',
    'header-16': '1rem',
    'header-14': '0.875rem',
    'body-24': '1.5rem',
    'body-20': '1.25rem',
    'body-16': '1rem',
    'body-14': '0.875rem',
    'body-12': '0.75rem',
  },
  fontWeight: {
    bold: 700,
    regular: 400,
  },
  color: {
    primary: '#B79F7B',
    'primary-darken': '#725B30',
    'primary-lighten': '#EBE6DE',
    'greyScale-1': '#FFFFFF',
    'greyScale-2': '#F7F7F8',
    'greyScale-3': '#EAEAEC',
    'greyScale-4': '#C3C3C7',
    'greyScale-5': '#8E8E95',
    'greyScale-6': '#1E1E20',
    'system-1': '#ED7474',
    black: '#000',
    white: '#fff',
  },
};

export default theme;
