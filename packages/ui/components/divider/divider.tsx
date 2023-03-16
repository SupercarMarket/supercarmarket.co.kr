import { CSSProperties } from 'react';

interface DividerProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  color?: string;
  className?: string;
}

const Divider = (props: DividerProps) => {
  const { width, height, margin, color, className = 'divider' } = props;
  return (
    <>
      <div role="separator" className={className} />
      <style jsx>{`
        .divider {
          width: ${width};
          height: ${height};
          margin: ${margin};
          background-color: ${color};
        }
      `}</style>
    </>
  );
};

export { Divider };
export type { DividerProps };
