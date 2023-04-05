/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

interface Arg extends IntersectionObserverInit {
  isFreezeOnceVisible?: boolean;
}

export default function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  isFreezeOnceVisible = false,
}: Arg): [
  IntersectionObserverEntry | undefined,
  React.Dispatch<React.SetStateAction<HTMLElement | null | undefined>>
] {
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
  const [target, setTarget] = React.useState<HTMLElement | null | undefined>(
    null
  );

  const frozen = entry?.isIntersecting && isFreezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  React.useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !target) {
      return;
    }

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(target);

    return () => observer.disconnect();
  }, [JSON.stringify(threshold), root, rootMargin, target]);

  return [entry, setTarget];
}
