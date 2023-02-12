import { deviceQuery } from '../styles/mediaQuery';
import useMediaQuery from './useMediaQuery';

export default function useMedia() {
  const isDestop = useMediaQuery(deviceQuery.desktop);
  const isTablet = useMediaQuery(deviceQuery.tablet);
  const isMobile = useMediaQuery(deviceQuery.mobile);

  return { isDestop, isTablet, isMobile };
}
