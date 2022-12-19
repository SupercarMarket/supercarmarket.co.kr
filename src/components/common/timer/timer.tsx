import useInterval from 'hooks/useInterval';
import * as React from 'react';

import Typography from '../typography';

interface TimerProps {
  time: number;
  reset?: boolean;
}

const Timer = ({ time, reset }: TimerProps) => {
  const [count, setCount] = React.useState(time);

  const onReset = React.useCallback(() => setCount(time), [time]);

  const formatter = (count: number) => {
    const min = Math.floor(count / 60).toString();
    let sec = (count % 60).toString();
    if (sec.length === 1) sec = `0${sec}`;
    return `${min}:${sec}`;
  };

  useInterval(() => {
    if (count) setCount((prev) => prev - 1);
  }, 1000);

  React.useEffect(() => {
    if (reset) onReset();
  }, [onReset, reset]);
  return (
    <Typography
      fontSize="body-16"
      fontWeight="regular"
      lineHeight="150%"
      color="system-1"
    >
      {formatter(count)}
    </Typography>
  );
};

export default Timer;
