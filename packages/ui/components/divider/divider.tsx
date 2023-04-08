import { CSSProperties } from 'react';

interface DividerProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  border?: React.CSSProperties['border'];
  borderBottom?: React.CSSProperties['borderBottom'];
  borderTop?: React.CSSProperties['borderTop'];
  color?: string;
  className?: string;
}

const Divider = (props: DividerProps) => {
  const {
    width,
    height,
    margin,
    color,
    border,
    borderBottom,
    borderTop,
    className = 'divider',
  } = props;

  const borderAttr = border
    ? { border }
    : {
        borderBottom,
        borderTop,
      };

  return (
    <>
      <div
        role="separator"
        className={className}
        style={{
          ...borderAttr,
        }}
      />
      <style jsx>{`
        .divider {
          width: ${width};
          height: ${height};
          margin: ${margin};
          background-color: ${color};
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export { Divider };
export type { DividerProps };
