import Link from "next/link";
import { FAQ } from "../components/FAQ";
import { ArrowDownRight } from "lucide-react";
import { FullWidthComponent } from "../components/FullWidthComponent";
import { Collapsible } from "../components/Collapsible";
import { Cursor1 } from "../components/Cursor1";

export default function ServicesPage() {
  return (
    <>
      {/* Main Section */}
      <article className="mt-[30px] mb-[20px]">
        <div className="mt-[0px] flex items-center justify-between">
          <p className="text-6xl font-[500]">
            OurCompany <br /> Service!
          </p>

          <div className="h-fit w-fit animate-ping rounded-full bg-gray-400 px-3 py-1 text-5xl font-extrabold text-black">
            <div className="h-1 w-1.5 rounded-full bg-black" />
          </div>
          <p className="w-[20%]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
            accusantium voluptatum adipisci ab dolor provident veniam quasi eos
          </p>
        </div>
      </article>
      <FullWidthComponent>
        <Cursor1 />
      </FullWidthComponent>

      <FAQ />
    </>
  );
}
