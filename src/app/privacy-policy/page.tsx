import "../globals.css";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Main Content */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-6 py-8 sm:p-10">
            {/* Introduction */}
            <div className="mb-10">
              <p className="mb-4 text-gray-700">
                This Privacy (&quot;Policy&quot;) applies to the securing and
                processing of personal data by{" "}
                <a
                  href="https://www.airportporterservice.com"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  www.airportporterservice.com
                </a>{" "}
                a specialized service unit owned & managed by Elite World
                Services Pvt Ltd (hereinafter &quot;EWS&quot;) in connection
                with personal data provided by any person (&quot;User&quot;) who
                has purchased or intends to purchase or inquiries about any
                product(s) or service(s) made by EWS through any of EWS
                interface channels including website, mobile site and mobile app
                (collectively referred herein as &quot;Sales Channels&quot;).
              </p>

              <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-800">
                  For the purpose of Privacy Policy:
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-blue-700">
                  <li>
                    References in this policy to &quot;you&quot; or
                    &quot;your&quot; are references to &quot;User&quot;
                  </li>
                  <li>
                    References to &quot;we&quot;, &quot;us&quot; or
                    &quot;our&quot; are references to &quot;EWS&quot;
                  </li>
                  <li>
                    When you take part in surveys or provide us with feedback
                  </li>
                  <li>
                    References to &quot;website&quot; mean a reference to
                    &quot;website(s)&quot;, &quot;mobile site(s)&quot; and
                    mobile app(s)
                  </li>
                </ul>
              </div>
            </div>

            {/* Purpose Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                PURPOSE
              </h2>
              <p className="mb-4 text-gray-700">
                We respect your need to understand how and why information is
                being collected, used, disclosed, transferred and stored. Thus
                we have developed this Policy to familiarize you with our
                practices. This policy sets out the way in which we process your
                information when you use our Website or other digital platforms
                in accordance with applicable data protection laws.
              </p>
              <p className="text-gray-700">
                It is important that you read this policy together with any
                other policies we may provide on specific occasions when we are
                collecting or processing your personal data, so that you are
                fully aware of how and why we are using your personal data. This
                policy supplements the other notices and is not intended to
                override them.
              </p>
            </section>

            {/* Controller & Insurance Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                CONTROLLER & INSURANCE
              </h2>
              <p className="mb-4 text-gray-700">
                A &quot;Controller&quot; is a person or organization who alone
                or jointly determines the purposes for which, and the manner in
                which, any personal data is, or is likely to be, processed. This
                notice is issued on behalf of Elite World Services Pvt Ltd (EWS)
                as a controller.
              </p>
              <p className="mb-4 text-gray-700">
                Processor is a natural or legal person, public authority, agency
                or other body which processes personal data on behalf of the
                Controller.
              </p>
              <p className="mb-4 text-gray-700">
                As the circumstances warrant EWS may be Controller or Processor
                of your personal data.
              </p>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <p className="text-gray-700">
                  &quot;ELITE WORLD SERVICES PVT LTD&quot; is committed to
                  protecting and respecting your privacy. This policy (together
                  with our Terms and Conditions and any other documents referred
                  to in it) sets out the basis on which any personal data we
                  collect from you, or that you provide to us, will be processed
                  by us. Please read the following carefully to understand our
                  views and practices regarding your personal data and how we
                  will treat it. For the purposes of the Data Protection Act
                  2000 (the &quot&quot;Act&quot&quot;), the data controller is
                  ELITE WORLD SERVICES PVT. LTD.
                </p>
              </div>
            </section>

            {/* Your Consent Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                YOUR CONSENT
              </h2>
              <p className="mb-4 text-gray-700">
                By using our Website, you understand and agree that personal
                information you provide through the Website will be held on a
                database created and operated by us, our group of companies
                and/or other selected third parties.
              </p>
              <p className="text-gray-700">
                Personal data includes any information about any user from which
                that person can be identified. It does not include personal data
                where the identity has been removed (anonymous data). You may be
                asked for personal data anytime you are in contact with EWS
                directly or indirectly through a third party.
              </p>
            </section>

            {/* Protecting Your Security Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                PROTECTING YOUR SECURITY
              </h2>
              <p className="mb-4 text-gray-700">
                To ensure that your credit, debit or charge card is not being
                used without your consent, we will validate name, address and
                other personal information supplied by you during the order
                process against appropriate third party databases. By accepting
                these terms and conditions you consent to these checks being
                made.
              </p>
              <p className="mb-4 text-gray-700">
                In performing these checks personal information provided by you
                may be disclosed to a registered Credit Reference Agency which
                may keep a record of that information. You can rest assured that
                this is done only to confirm your identity, that a credit check
                is not performed and that your credit rating will be unaffected.
              </p>
              <p className="text-gray-700">
                All information provided by you will be treated securely and
                strictly in accordance with the Act.
              </p>
            </section>

            {/* Your Rights Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                YOUR RIGHTS
              </h2>
              <p className="mb-4 text-gray-700">
                You have the right to ask us not to process your personal data
                for marketing purposes. We will inform you (before collecting
                your data) if we intend to use your data for such purposes. You
                can exercise your right to prevent such processing by checking
                certain boxes on the forms we use to collect your data, for
                example, the BOOKING/RESERVATION FORMS. You can also exercise
                your right not to receive marketing information at any time by
                clicking the link on the bottom of each email or contacting our
                customer service team on{" "}
                <a
                  href="tel:+919599993820"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  +91 95999 93820
                </a>
              </p>
              <p className="text-gray-700">
                The Website may, from time to time, contain links to and from
                the websites of our partner networks, advertisers and
                affiliates. If you follow a link to any of these websites,
                please note that these websites have their own privacy policies
                and that we do not accept any responsibility or liability for
                these policies. Please check these policies before you submit
                any personal data to these websites.
              </p>
            </section>

            {/* Database & Cookies Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                DATABASE & COOKIES
              </h2>
              <p className="mb-4 text-gray-700">
                In order that we can monitor and improve the Website, we may
                gather certain information about you when you use it, including
                details of your domain name and IP (Internet Provider) address,
                operating system and browser. A cookie is an element of data
                that a website can send to your browser, which may then store it
                on the hard drive of your computer.
              </p>
              <p className="mb-4 text-gray-700">
                We collect, use and share aggregated data such as statistical or
                demographic data for any purpose. Aggregated data may be derived
                from your personal data but is not considered personal data in
                law as this data does not directly or indirectly reveal your
                identity. For example, we may aggregate your Usage Data to
                calculate the percentage of users accessing a specific website
                feature. However, if we combine or connect aggregated data with
                your personal data so that it can directly or indirectly
                identify you, we treat the combined data as personal data which
                will be used in accordance with this policy. We do not collect
                any special categories of personal data about you through our
                Website (this includes details about your race or ethnicity,
                religious or philosophical beliefs, sex life, sexual
                orientation, political opinions, trade union membership,
                information about your health and genetic and biometric data).
                Nor do we collect any information about criminal convictions and
                offences.
              </p>
              <p className="mb-6 text-gray-700">
                We collect, use, store and transfer different kinds of personal
                data about you. We have grouped together the following
                categories of personal data to explain how this type of
                information is used by us.
              </p>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 font-semibold text-gray-800">
                  These terms are used throughout this notice as:
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Contact Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      including your residential address, work address, email
                      address and telephone numbers;
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Identity Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      including your first name, last name, username or similar
                      identifier, title;
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Website User Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      Usernames, Passwords and other security related
                      information used by you in relation to our services
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Transaction Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      Transactional history about your aviation activities,
                      buying behaviour. Information pertaining any other
                      traveller(s) for whom you made a booking through your
                      registered EWS account. In such case, you must confirm and
                      represent that each of the other traveller(s) for whom a
                      booking has been made, has agreed to have the information
                      shared by you disclosed to us and further be shared by us
                      with the concerned service provider(s).
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Marketing and Communications Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      including your marketing and communication preferences. We
                      also track when you receive and read marketing
                      communications from us, which information we use to
                      improve our marketing services, provide you with more
                      relevant information and improve the quality of our
                      marketing materials. Additional information about the
                      personal data we process in connection with marketing is
                      included with the marketing communications we send you;
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Public Domain or Third Party Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      Data available in public domain or received from any third
                      party including social media channels, including but not
                      limited to personal or non-personal information from your
                      linked social media channels (like name, email address,
                      friend list, profile pictures or any other information
                      that is permitted to be received as per your account
                      settings) as a part of your account information.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Profile Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      including information collected progressively when you
                      visit our site including your referral website, pages you
                      visit, actions you take, patterns of page visits and
                      information from forms you fill in;
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Technical Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      includes information collected when you access our
                      website, mobile site or mobile app your internet protocol
                      (IP) address, your login data, browser type and version,
                      time zone setting and location, browser plug-in types and
                      versions, operating system and platform and other
                      technology on the devices you are using; and
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Usage Data&quot;:
                    </dt>
                    <dd className="ml-4 text-gray-600">
                      information about how you use our Website.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-700">
                      &quot;Any other Personal Data&quot;:
                    </dt>
                  </div>
                </dl>
              </div>
            </section>

            {/* Access Rights Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                ACCESS RIGHTS
              </h2>
              <p className="text-gray-700">
                You have a right to access the personal data about you that is
                held by us. To obtain a copy of the personal information we hold
                about you, please write to us at the following address enclosing
                your postal details to{" "}
                <span className="font-medium">
                  ELITE WORLD SERVICES PVT LTD, Elite Tower, 1st Floor, G-364/B,
                  Raj Nagar-II, Palam Colony, New Delhi-110077 India.
                </span>
              </p>
            </section>

            {/* Changes to Privacy Policy Section */}
            <section className="mb-10">
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-semibold text-gray-800">
                CHANGES TO OUR PRIVACY POLICY
              </h2>
              <p className="mb-4 text-gray-700">
                Any changes we may make to our Privacy Policy in the future will
                be posted on this page and, where appropriate, notified to you
                by email.
              </p>
              <p className="text-gray-700">
                If you have any queries about data protection, please contact us
                on{" "}
                <a
                  href="tel:+919599993820"
                  className="font-medium text-blue-600 hover:text-blue-800"
                >
                  +91 95999 93820
                </a>
                .
              </p>
            </section>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="mt-2 font-medium">Elite World Services Pvt Ltd</p>
          <a
            href="https://www.airportporterservice.com"
            className="mt-1 block font-medium text-blue-600 hover:text-blue-800"
          >
            www.airportporterservice.com
          </a>
        </div>
      </div>
    </div>
  );
}
