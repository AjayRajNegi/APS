import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto h-full w-[95%] max-w-[1540px] bg-white pt-[90px]">
      {children}
    </div>
  );
}
