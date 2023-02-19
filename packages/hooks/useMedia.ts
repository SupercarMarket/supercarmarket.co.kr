import useMediaQuery from './useMediaQuery';

interface useMediaProps {
  deviceQuery: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export default function useMedia({ deviceQuery }: useMediaProps) {
  const isDestop = useMediaQuery(deviceQuery.desktop);
  const isTablet = useMediaQuery(deviceQuery.tablet);
  const isMobile = useMediaQuery(deviceQuery.mobile);

  return { isDestop, isTablet, isMobile };
}
