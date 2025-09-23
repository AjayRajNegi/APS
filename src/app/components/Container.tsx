import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto h-full w-[98%] max-w-[1540px] bg-white pt-[79px] md:w-[95%] md:pt-[82px]">
      {children}
    </div>
  );
}
