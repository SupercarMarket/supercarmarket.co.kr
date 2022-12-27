import { deviceQuery } from '../styles/mediaQuery';
import useMediaQuery from './useMediaQuery';

export default function useMedia() {
  const isDestop = useMediaQuery(deviceQuery.desktop);
  const isWideDestop = useMediaQuery(deviceQuery.wideDesktop);

  return { isDestop, isWideDestop };
}
