import React from "react";

type Props = {
  children?: any;
  className?: string;
  onClick?: any;
}

export default function IconButton({ children, onClick, className }: Props) {

  return (
    <div className={`cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}
