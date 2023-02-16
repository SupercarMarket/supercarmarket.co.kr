import clsx from 'clsx';
import * as React from 'react';
import { theme } from '../../styles';

interface HighlightProps extends React.PropsWithChildren {
  color?: string;
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  lineHeight?: React.CSSProperties['lineHeight'];
}

const Highlight = (props: HighlightProps) => {
  const {
    color = theme.color['system-1'],
    fontSize = theme.fontSize['header-20'],
    fontWeight = theme.fontWeight.bold,
    lineHeight = '120%',
    children,
  } = props;
  return (
    <b className={clsx('highlight')}>
      {children}
      <style jsx>{`
        .highlight {
          color: ${color};
          font-size: ${fontSize};
          font-weight: ${fontWeight};
          line-height: ${lineHeight};
        }
      `}</style>
    </b>
  );
};

export { Highlight };
export type { HighlightProps };
