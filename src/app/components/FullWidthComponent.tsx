import { ReactNode } from "react";

export function FullWidthComponent({ children }: { children: ReactNode }) {
  return (
    <div className="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] max-w-[100vw]">
      {children}
    </div>
  );
}
