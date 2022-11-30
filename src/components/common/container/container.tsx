import clsx from 'clsx';
import type { CSSProperties, ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  element?: HTMLElement;
  children?: ReactNode;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  padding?: CSSProperties['padding'];
  margin?: CSSProperties['margin'];
  position?: CSSProperties['position'];
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  border?: CSSProperties['border'];
  borderBottom?: CSSProperties['borderBottom'];
  borderTop?: CSSProperties['borderTop'];
  borderRadius?: CSSProperties['borderRadius'];
  boxSizing?: CSSProperties['boxSizing'];
}

const Container = (props: ContainerProps) => {
  const {
    element = 'div',
    width = '100%',
    height,
    padding = '0',
    margin = '0',
    position,
    display,
    justifyContent,
    flexDirection,
    alignItems,
    gap,
    boxSizing = 'border-box',
    borderBottom,
    borderTop,
    borderRadius,
    border,
    className,
    children,
  } = props;
  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    element as any;
  const borderAttr = border
    ? { border }
    : {
        borderBottom,
        borderTop,
      };
  return (
    <Component
      className={clsx('container', className)}
      style={{
        width,
        height,
        padding,
        margin,
        position,
        display,
        boxSizing,
        flexDirection,
        justifyContent,
        alignItems,
        gap,
        borderRadius,
        maxWidth: '100%',
        ...borderAttr,
      }}
    >
      {children}
    </Component>
  );
};

export default Container;
