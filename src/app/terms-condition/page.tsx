import "../globals.css";
import { getPageContent } from "@/lib/api/common";

export default async function Terms() {
  const res = await getPageContent("Term Conditions");
  console.log(res);
  return (
    <section id="term-condition">
      <div className="content">
        <div className="title">
          <h1>
            <span>Terms And Condition</span>
          </h1>
        </div>
        <div className="top-content">
          <div dangerouslySetInnerHTML={{ __html: res }} />
        </div>
      </div>
    </section>
  );
}
