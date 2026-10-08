import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// Centers content and applies consistent horizontal padding across all pages.
export function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-5xl px-4 ${className ?? ""}`}>{children}</div>;
}
