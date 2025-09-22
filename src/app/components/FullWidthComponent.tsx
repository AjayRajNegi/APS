import { ReactNode } from "react";

export function FullWidthComponent({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto max-w-[1540px]">{children}</div>;
}
