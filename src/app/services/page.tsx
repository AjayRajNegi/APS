import { FAQ } from "../components/FAQ";
import { Cursor1 } from "../components/Cursor1";
import { FullWidthComponent } from "../components/FullWidthComponent";

export default function ServicesPage() {
  return (
    <>
      {/* Main Section */}
      <article className="mt-[30px] mb-[20px] bg-[#f7f9fa]">
        <div className="mt-[0px] flex flex-col justify-between md:flex-row md:items-center">
          <p className="order-1 text-6xl font-[500]">
            OurCompany <br /> Service!
          </p>

          <div className="order-3 mx-auto my-4 h-fit w-fit animate-ping rounded-full bg-gray-400 px-3 py-1 text-5xl font-extrabold text-black md:order-2 md:my-0">
            <div className="h-1 w-1.5 rounded-full bg-black" />
          </div>
          <p className="order-2 w-[80%] md:order-3 md:w-[25%]">
            Our friendly customer support team is available to answer your
            queries and provide guidance on selecting the right service for your
            travel needs. We strive to respond promptly and ensure your journey
            is smooth from start to finish
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
