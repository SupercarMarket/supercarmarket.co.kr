import clsx from 'clsx';
import * as React from 'react';

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  padding?: React.CSSProperties['padding'];
  margin?: React.CSSProperties['margin'];
  position?: React.CSSProperties['position'];
  display?: React.CSSProperties['display'];
  zIndex?: React.CSSProperties['zIndex'];
  flex?: React.CSSProperties['flex'];
  flexDirection?: React.CSSProperties['flexDirection'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  gap?: React.CSSProperties['gap'];
  border?: React.CSSProperties['border'];
  borderBottom?: React.CSSProperties['borderBottom'];
  borderTop?: React.CSSProperties['borderTop'];
  borderRadius?: React.CSSProperties['borderRadius'];
  boxSizing?: React.CSSProperties['boxSizing'];
  background?: React.CSSProperties['background'];
  gridTemplateColumns?: React.CSSProperties['gridTemplateColumns'];
  top?: React.CSSProperties['top'];
  bottom?: React.CSSProperties['bottom'];
  left?: React.CSSProperties['left'];
  right?: React.CSSProperties['right'];
  handleClick?: () => void;
}

type ContainerProps<Element extends keyof JSX.IntrinsicElements = 'div'> =
  BaseProps & {
    as?: Element;
  } & Omit<React.AllHTMLAttributes<Element>, 'as'>;

const Container = React.forwardRef(function Container<
  Element extends keyof JSX.IntrinsicElements = 'div'
>(props: ContainerProps<Element>, ref: React.Ref<HTMLDivElement>) {
  const {
    as: Component = 'div',
    width = '100%',
    height,
    padding = '0',
    margin = '0',
    position,
    display,
    justifyContent,
    flex,
    flexDirection,
    alignItems,
    gap,
    boxSizing = 'border-box',
    borderBottom,
    borderTop,
    borderRadius,
    border,
    gridTemplateColumns,
    background,
    className,
    zIndex,
    top,
    bottom,
    left,
    right,
    style,
    children,
    handleClick,
  } = props as ContainerProps;

  const borderAttr = border
    ? { border }
    : {
        borderBottom,
        borderTop,
      };

  return (
    <Component
      ref={ref}
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
        flex,
        justifyContent,
        alignItems,
        gap,
        gridTemplateColumns,
        background,
        borderRadius,
        maxWidth: '100%',
        zIndex,
        top,
        bottom,
        left,
        right,
        ...borderAttr,
        ...style,
      }}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
});

export { Container };
export type { ContainerProps };
