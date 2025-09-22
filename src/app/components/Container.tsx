import { ReactNode } from "react";

export default function Container({
  children,
  fluid = false,
}: {
  children: ReactNode;
  fluid?: boolean;
}) {
  return (
    <div
      className={
        fluid
          ? "h-full w-full bg-white pt-[90px]"
          : "mx-auto h-full w-[98%] max-w-[1540px] bg-white pt-[79px] md:w-[95%] md:pt-[90px]"
      }
    >
      {children}
    </div>
  );
}
