import { CSSProperties } from 'react';

import { Typography } from '../typography';

interface TitleProps {
  children?: React.ReactNode;
  marginTop?: CSSProperties['marginTop'];
  marginBottom?: CSSProperties['marginBottom'];
  textAlign?: CSSProperties['textAlign'];
}

const Title = ({
  children,
  marginTop,
  marginBottom,
  textAlign = 'start',
}: TitleProps) => {
  return (
    <Typography
      fontSize="header-24"
      fontWeight="bold"
      color="greyScale-6"
      lineHeight="120%"
      style={{
        width: '100%',
        textAlign,
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </Typography>
  );
};

export { Title };
export type { TitleProps };
