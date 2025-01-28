import React, { ReactNode } from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  onClick?: () => void;
}

const Container = ({
  children,
  className,
  style,
  id,
  ...props
}: ContainerProps) => {
  return React.createElement(
    'div',
    { ...props, style, id, className },
    children,
  );
};

export default Container;
