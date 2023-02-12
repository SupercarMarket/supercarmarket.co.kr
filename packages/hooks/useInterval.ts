import * as React from 'react';

export default function useInterval(callback: VoidFunction, delay?: number) {
  const savedCallback = React.useRef<VoidFunction>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => savedCallback.current();

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
