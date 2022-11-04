import { CSSProperties } from 'react';

import Typography from '../typography';

interface TitleProps {
  children?: React.ReactNode;
  marginTop?: CSSProperties['marginTop'];
  marginBottom?: CSSProperties['marginBottom'];
}

const Title = ({ children, marginTop, marginBottom = '20px' }: TitleProps) => {
  return (
    <Typography
      fontSize="header-24"
      fontWeight="bold"
      color="greyScale-6"
      lineHeight="120%"
      style={{
        width: '100%',
        textAlign: 'start',
        marginTop,
        marginBottom,
      }}
    >
      {children}
    </Typography>
  );
};

export default Title;
