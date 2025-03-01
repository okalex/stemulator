import React from "react";

type Props = {
  children?: any;
  className?: string;
}

export function Row({ children, className }: Props) {
  return (
    <div className={`flex flex-row ${className}`}>
      {children}
    </div>
  );
}

export function Column({ children, className }: Props) {
  return (
    <div className={`flex flex-col ${className}`}>
      {children}
    </div>
  );
}
