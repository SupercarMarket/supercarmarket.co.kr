import clsx from 'clsx';
import type { AllHTMLAttributes, CSSProperties, ReactNode } from 'react';

interface BaseProps {
  className?: string;
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

type ContainerProps<Element extends keyof JSX.IntrinsicElements = 'div'> =
  BaseProps & {
    as?: Element;
  } & Omit<AllHTMLAttributes<Element>, 'as'>;

const Container = <Element extends keyof JSX.IntrinsicElements = 'div'>(
  props: ContainerProps<Element>
) => {
  const {
    as: Component = 'div',
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
  } = props as ContainerProps;

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
