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
          : "mx-auto h-full w-[95%] max-w-[1540px] bg-white pt-[90px]"
      }
    >
      {children}
    </div>
  );
}
