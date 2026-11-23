import { PageTitle } from "../components/typography";
import LegalTableOfContents, {
  type LegalTocEntry,
} from "../components/legal/LegalTableOfContents";

const TERMS_TOC: LegalTocEntry[] = [
  { id: "about", label: "1. About Hustle Learning" },
  { id: "eligibility", label: "2. Eligibility and User Accounts" },
  { id: "resources", label: "3. Educational Resources" },
  { id: "subscriptions", label: "4. Subscriptions" },
  { id: "batch-classes", label: "5. Online Batch Classes" },
  { id: "online-tutoring", label: "6. Personal Online Tutoring" },
  { id: "home-tutoring", label: "7. Personal Home Tutoring" },
  { id: "books", label: "8. Physical Books" },
  { id: "payments", label: "9. Payments and Pricing" },
  { id: "refunds", label: "10. Refunds and Cancellations" },
  { id: "conduct", label: "11. User Conduct" },
  { id: "intellectual-property", label: "12. Intellectual Property" },
  { id: "third-party", label: "13. Third-Party Services" },
  { id: "availability", label: "14. Website Availability" },
  { id: "privacy-info", label: "15. Privacy and Personal Information" },
  { id: "communications", label: "16. Communications and Marketing" },
  { id: "liability", label: "17. Limitation of Liability" },
  { id: "indemnification", label: "18. Indemnification" },
  { id: "suspension", label: "19. Suspension and Termination" },
  { id: "changes", label: "20. Changes to These Terms" },
  { id: "governing-law", label: "21. Governing Law" },
  { id: "grievance", label: "22. Grievance Redressal" },
  { id: "general", label: "23. General Provisions" },
];

const CONTACT_EMAIL = "hustlelearning.info@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 88519 48143";
const CONTACT_PHONE_HREF = "tel:+918851948143";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-sans text-base font-semibold text-text-primary">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-sm font-semibold text-text-primary">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-2">{children}</p>;
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 marker:text-text-muted">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-narrow)] px-4 py-10 md:px-6 md:py-14">
      <PageTitle>Terms and Conditions</PageTitle>
      <p className="mt-2 text-xs font-semibold text-text-muted">
        Last Updated: 19 November 2026
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="flex min-w-0 flex-col gap-6 text-sm leading-[1.6] text-text-secondary">
        <section>
          <P>Welcome to Hustle Learning.</P>
          <P>
            These Terms and Conditions (“Terms”) govern your access to and use
            of the Hustle Learning website, its educational resources,
            subscriptions, online classes, tutoring services, physical books
            and other services made available through our platform.
          </P>
          <P>
            Hustle Learning is independently operated by{" "}
            <strong className="text-text-primary">
              Vipin Nawal
            </strong>{" "}
            (“we”, “us”, “our” or “Hustle Learning”).
          </P>
          <P>
            By accessing our website, creating an account, submitting an
            enquiry, purchasing a subscription, enrolling in a class or using
            any of our services, you acknowledge that you have read and
            understood these Terms and agree to be bound by them.
          </P>
          <P>
            If you do not agree with these Terms, please do not use our website
            or services.
          </P>
        </section>

        <section>
          <H2 id="about">1. About Hustle Learning</H2>
          <P>
            Hustle Learning is an independent educational platform that
            provides academic resources and learning support to school
            students.
          </P>
          <P>Our services may include:</P>
          <UL
            items={[
              "Free educational resources and study materials.",
              "Premium educational resources through paid subscriptions.",
              "Online batch classes.",
              "Personal online tutoring.",
              "Personal home tutoring.",
              "Physical educational books and printed materials.",
              "Educational articles, announcements, updates and other learning-related content.",
            ]}
          />
          <P>
            Our resources may cover CBSE and other school curricula, classes,
            subjects and academic levels as specified on the website.
          </P>
          <P>
            Hustle Learning is an independent educational service provider and
            is not affiliated with, endorsed by or officially associated with
            the Central Board of Secondary Education (CBSE), NCERT or any
            government education board unless explicitly stated otherwise.
          </P>
          <P>
            References to CBSE, NCERT, examination boards, textbooks, syllabi
            and educational institutions are made for identification,
            educational and informational purposes.
          </P>
        </section>

        <section>
          <H2 id="eligibility">2. Eligibility and User Accounts</H2>
          <P>
            You may browse publicly available content without creating an
            account.
          </P>
          <P>
            Certain services, including paid subscriptions, online classes and
            personalised tutoring, may require account registration or the
            submission of personal information.
          </P>
          <P>You agree to:</P>
          <UL
            items={[
              "Provide accurate, complete and current information.",
              "Keep your login credentials confidential.",
              "Not share your account credentials with unauthorised individuals.",
              "Inform us if you suspect unauthorised access to your account.",
              "Use your account only for legitimate educational purposes.",
            ]}
          />
          <P>
            You are responsible for activities conducted through your account,
            except where unauthorised activity results from circumstances for
            which we are legally responsible.
          </P>
          <P>
            We reserve the right to suspend or restrict accounts involved in
            fraud, misuse, unauthorised sharing, payment abuse or violations of
            these Terms.
          </P>
          <H3>Students under 18</H3>
          <P>
            Hustle Learning provides educational services that may be used by
            students under the age of 18.
          </P>
          <P>
            Users must provide truthful information when registering or
            purchasing services. Where applicable law requires parental or
            legal guardian consent, verification or authorisation, such
            requirements must be fulfilled before the relevant personal data is
            processed or service is provided.
          </P>
          <P>
            Nothing in these Terms removes or limits any statutory rights or
            protections available to minors.
          </P>
        </section>

        <section>
          <H2 id="resources">3. Educational Resources and Study Materials</H2>
          <P>
            Hustle Learning may provide educational resources, including:
          </P>
          <UL
            items={[
              "NCERT Solutions.",
              "Chapter-wise Notes.",
              "Important Questions.",
              "Previous Year Questions (PYQs).",
              "Sample Papers.",
              "Practice Worksheets.",
              "Formula Sheets.",
              "Revision Materials.",
              "Educational Articles and Updates.",
              "Other academic resources published on the website.",
            ]}
          />
          <P>
            Some resources may be freely accessible, while others may require
            an active paid subscription or separate purchase.
          </P>
          <P>
            We make reasonable efforts to ensure that the educational content
            published on our platform is accurate and useful. However, we do
            not guarantee that every resource is completely free from errors,
            omissions or outdated information.
          </P>
          <P>
            Syllabi, examination patterns, assessment methods, textbooks and
            academic guidelines may change. Users should verify important
            examination-related information against the latest official
            announcements issued by the relevant educational board or
            institution.
          </P>
          <P>
            Educational materials provided by Hustle Learning are intended to
            support learning and examination preparation. They should not be
            treated as a substitute for official textbooks, school
            instructions, prescribed syllabi or official examination documents.
          </P>
        </section>

        <section>
          <H2 id="subscriptions">4. Subscriptions and Premium Resources</H2>
          <P>
            Hustle Learning offers paid subscriptions that provide access to
            selected premium educational resources.
          </P>
          <P>The subscription plans currently offered are:</P>
          <UL
            items={[
              <>
                <strong className="text-text-primary">
                  Basic Subscription – ₹99 per month
                </strong>
              </>,
              <>
                <strong className="text-text-primary">
                  Premium Subscription – ₹249 per month
                </strong>
              </>,
            ]}
          />
          <P>
            The features, benefits, access limits and included resources of
            each plan will be described on the relevant pricing or subscription
            page.
          </P>
          <P>
            By purchasing a subscription, you agree to pay the applicable
            subscription fee displayed at checkout.
          </P>
          <H3>4.1 Subscription Access</H3>
          <P>
            Subscription access is limited to the features and resources
            included in the selected plan.
          </P>
          <P>A subscription does not automatically include:</P>
          <UL
            items={[
              "Online batch classes.",
              "Personal online tutoring.",
              "Personal home tutoring.",
              "Physical books.",
              "Any other service explicitly listed as a separate paid offering.",
            ]}
          />
          <P>
            Access to subscription resources is provided for the applicable
            subscription period.
          </P>
          <H3>4.2 Subscription Duration and Renewal</H3>
          <P>Subscriptions are offered on a monthly basis.</P>
          <P>
            Your subscription remains active for the period purchased, subject
            to successful payment and compliance with these Terms.
          </P>
          <P>
            Where recurring billing or automatic renewal is enabled and
            disclosed during checkout, the subscription may renew according to
            the displayed billing terms until cancelled.
          </P>
          <P>
            Where automatic renewal is not enabled, users must manually
            purchase the next subscription period to continue access.
          </P>
          <H3>4.3 Cancellation of Subscriptions</H3>
          <P>You may cancel your subscription at any time.</P>
          <P>
            Cancellation prevents future renewals where recurring billing is
            enabled. Unless otherwise specified, cancellation does not
            automatically terminate access to resources already paid for during
            the current subscription period.
          </P>
          <P>
            No additional subscription period will be provided without the
            applicable payment.
          </P>
          <H3>4.4 Subscription Refund Policy</H3>
          <P>
            Subscription fees are generally non-refundable once the
            subscription has been activated or access to premium resources has
            been provided.
          </P>
          <P>We do not ordinarily provide refunds for:</P>
          <UL
            items={[
              "Change of mind after purchasing a subscription.",
              "Failure to use the subscription.",
              "Unused days within an active subscription period.",
              "Accidental purchases where access has already been activated.",
              "Failure to cancel a recurring subscription before its renewal date.",
            ]}
          />
          <P>
            However, this policy does not exclude refunds or other remedies
            required under applicable law, including cases involving duplicate
            payments, unauthorised transactions, material service failures or
            services not delivered as promised.
          </P>
          <P>
            If you believe you have been incorrectly charged, contact us with
            the relevant payment details.
          </P>
        </section>

        <section>
          <H2 id="batch-classes">5. Online Batch Classes</H2>
          <P>
            Hustle Learning offers online batch classes for selected classes
            and subjects.
          </P>
          <P>The currently advertised pricing is:</P>
          <UL
            items={[
              <>
                <strong className="text-text-primary">₹499 per month</strong>
              </>,
              <>
                <strong className="text-text-primary">₹5,000 per academic year</strong>
              </>,
            ]}
          />
          <P>
            The applicable fee, session details, class schedule, duration,
            subject coverage and other conditions will be communicated before
            enrolment or payment.
          </P>
          <H3>5.1 Class Participation</H3>
          <P>Students are expected to:</P>
          <UL
            items={[
              "Join classes on time.",
              "Maintain appropriate conduct.",
              "Avoid disrupting lessons.",
              "Respect teachers and other students.",
              "Use the class platform for educational purposes.",
              "Avoid sharing class access links with unauthorised individuals.",
            ]}
          />
          <H3>5.2 Class Schedules</H3>
          <P>
            Class schedules may be modified due to teacher availability,
            technical issues, operational requirements or other reasonable
            circumstances.
          </P>
          <P>
            We will make reasonable efforts to communicate significant changes
            in advance.
          </P>
          <P>
            If a class is cancelled or cannot be delivered by Hustle Learning,
            we may arrange a replacement class, reschedule the session or
            provide another appropriate remedy, depending on the circumstances.
          </P>
          <H3>5.3 Recordings and Learning Materials</H3>
          <P>
            Where recordings, notes or supplementary materials are provided,
            their availability and access duration may vary.
          </P>
          <P>
            Students must not record, reproduce, redistribute, upload or
            commercially exploit class recordings or materials without prior
            written permission.
          </P>
          <H3>5.4 Missed Classes</H3>
          <P>Students are responsible for attending scheduled classes.</P>
          <P>
            Missing a class due to personal reasons, internet connectivity
            problems, device issues or scheduling conflicts does not
            automatically entitle the student to a refund or replacement
            session.
          </P>
          <P>
            Any alternative arrangement will be considered according to the
            specific class policy communicated at enrolment and applicable law.
          </P>
        </section>

        <section>
          <H2 id="online-tutoring">6. Personal Online Tutoring</H2>
          <P>
            Hustle Learning offers individual online tutoring services at
            prices starting from{" "}
            <strong className="text-text-primary">₹499 per hour</strong>.
          </P>
          <P>The final price may vary depending on:</P>
          <UL
            items={[
              "Subject and class.",
              "Tutor availability and qualifications.",
              "Number of sessions.",
              "Session duration.",
              "Academic requirements.",
              "Any additional services agreed upon.",
            ]}
          />
          <P>
            The applicable price and arrangement will be communicated before
            confirmation.
          </P>
          <P>
            Students are expected to attend scheduled sessions punctually and
            maintain appropriate behaviour.
          </P>
          <P>
            Rescheduling, cancellation, missed sessions and refunds will be
            governed by the specific terms communicated when the tutoring
            arrangement is confirmed, subject to applicable law.
          </P>
          <P>
            Hustle Learning reserves the right to change or replace an assigned
            tutor where reasonably necessary, including due to availability,
            scheduling, performance, misconduct or other operational reasons.
          </P>
          <P>
            Where a tutor becomes unavailable, we will make reasonable efforts
            to arrange a suitable replacement or discuss an alternative
            arrangement.
          </P>
        </section>

        <section>
          <H2 id="home-tutoring">7. Personal Home Tutoring</H2>
          <P>
            Hustle Learning offers personal home tutoring services at prices
            starting from <strong className="text-text-primary">₹4,999</strong>.
          </P>
          <P>The final fee depends on factors such as:</P>
          <UL
            items={[
              "Student's class and subject requirements.",
              "Number of subjects.",
              "Frequency of classes.",
              "Number of teaching hours.",
              "Location and travel requirements.",
              "Tutor availability.",
              "Duration of the tutoring arrangement.",
            ]}
          />
          <P>
            The final quotation and service conditions will be communicated
            before confirmation.
          </P>
          <P>
            Home tutoring arrangements are subject to tutor availability and
            location feasibility.
          </P>
          <P>
            Users must provide accurate location and scheduling information
            when requesting a tutor.
          </P>
          <H3>7.1 Tutor Conduct and Replacement</H3>
          <P>
            Hustle Learning expects tutors to maintain professional conduct and
            provide appropriate academic support.
          </P>
          <P>
            We reserve the right to replace or discontinue an assigned tutor in
            cases involving misconduct, inappropriate behaviour, poor
            performance, unavailability, scheduling difficulties or other
            reasonable grounds.
          </P>
          <P>
            Where possible, we will communicate the change and discuss a
            suitable replacement.
          </P>
          <H3>7.2 Home Tutoring Safety</H3>
          <P>
            Students and families should communicate any relevant scheduling,
            access or safety requirements before tutoring begins.
          </P>
          <P>
            All parties are expected to maintain respectful and appropriate
            professional boundaries.
          </P>
          <P>
            Hustle Learning may investigate reported misconduct and take
            appropriate action, including discontinuing a tutor&apos;s
            assignment.
          </P>
        </section>

        <section>
          <H2 id="books">8. Physical Books and Printed Materials</H2>
          <P>
            Hustle Learning may offer physical educational books, printed notes
            or other learning materials for separate purchase.
          </P>
          <P>
            Physical products are not included in any subscription unless
            expressly stated.
          </P>
          <P>
            The product price, availability, delivery charges, estimated
            delivery period and other applicable conditions will be displayed
            or communicated before purchase.
          </P>
          <H3>8.1 Orders and Payments</H3>
          <P>Orders are subject to product availability and successful payment.</P>
          <P>
            We reserve the right to decline or cancel an order where necessary
            due to stock unavailability, pricing errors, payment issues or
            other legitimate reasons. Where payment has already been received
            for an order that cannot be fulfilled, an appropriate refund will
            be processed.
          </P>
          <H3>8.2 Shipping and Delivery</H3>
          <P>
            Delivery estimates are indicative and may be affected by courier
            operations, weather conditions, logistics disruptions or other
            circumstances beyond our reasonable control.
          </P>
          <P>Users must provide accurate delivery information.</P>
          <H3>8.3 Damaged, Defective or Incorrect Products</H3>
          <P>
            If you receive a damaged, defective or incorrect product, contact
            us within a reasonable period after delivery and provide relevant
            details and supporting photographs where available.
          </P>
          <P>
            We will review the issue and determine an appropriate remedy, such
            as replacement, refund or another resolution, in accordance with
            applicable consumer protection laws.
          </P>
        </section>

        <section>
          <H2 id="payments">9. Payments and Pricing</H2>
          <P>
            All prices are displayed in Indian Rupees (INR), unless otherwise
            specified.
          </P>
          <P>
            Payments may be processed through third-party payment gateways or
            other payment methods made available on the website.
          </P>
          <P>By making a payment, you confirm that:</P>
          <UL
            items={[
              "You are authorised to use the selected payment method.",
              "The payment information provided is accurate.",
              "You agree to pay the displayed price and applicable charges.",
              "You have reviewed the service details before completing the transaction.",
            ]}
          />
          <P>
            Hustle Learning does not store complete card details or sensitive
            payment credentials unless expressly stated in the relevant payment
            arrangement.
          </P>
          <P>
            We are not responsible for delays caused by banks, payment gateways
            or other third-party payment providers, except where applicable
            law provides otherwise.
          </P>
          <H3>9.1 Pricing Changes</H3>
          <P>
            We reserve the right to revise prices, introduce new plans or
            modify service fees.
          </P>
          <P>
            Any price change will apply prospectively and will not
            retrospectively change a completed purchase.
          </P>
          <P>
            Where applicable, users will be informed of revised prices before
            making a new purchase or renewing a service.
          </P>
        </section>

        <section>
          <H2 id="refunds">10. Refunds and Cancellations</H2>
          <P>
            Different services may have different cancellation and refund
            conditions.
          </P>
          <P>
            The applicable policy will be communicated on the relevant service
            or checkout page.
          </P>
          <P>Unless otherwise stated:</P>
          <UL
            items={[
              "Subscription purchases are generally non-refundable after activation.",
              "Subscription cancellation may be requested at any time.",
              "Online classes are subject to the class-specific cancellation conditions.",
              "Personal tutoring arrangements are subject to the agreed session and cancellation terms.",
              "Physical products are subject to applicable return, replacement and refund conditions.",
            ]}
          />
          <P>
            Nothing in this section is intended to restrict any right or
            remedy available to a consumer under applicable Indian law.
          </P>
          <P>
            Where a refund is approved, it will generally be processed through
            the original payment method or another mutually agreed method.
            Processing time may depend on the payment provider or bank.
          </P>
        </section>

        <section>
          <H2 id="conduct">11. User Conduct and Acceptable Use</H2>
          <P>
            You agree to use Hustle Learning only for lawful and legitimate
            purposes.
          </P>
          <P>You must not:</P>
          <UL
            items={[
              "Copy, reproduce, republish or distribute paid study materials without permission.",
              "Sell, rent, share or commercially exploit access to subscription resources.",
              "Share account credentials or paid class links with unauthorised users.",
              "Attempt to bypass subscription restrictions or access controls.",
              "Upload malicious software or attempt to compromise the website.",
              "Interfere with the website's operation, security or infrastructure.",
              "Submit false, misleading, abusive or fraudulent information.",
              "Harass, threaten, discriminate against or abuse teachers, tutors, staff or other students.",
              "Use the platform to distribute unlawful, harmful or offensive content.",
              "Use automated systems to scrape, copy or extract website content without permission.",
              "Attempt unauthorised access to accounts, databases or restricted resources.",
            ]}
          />
          <P>
            We may suspend or terminate access where we reasonably believe that
            these Terms have been violated.
          </P>
        </section>

        <section>
          <H2 id="intellectual-property">12. Intellectual Property Rights</H2>
          <P>
            Unless otherwise stated, the website, its branding, design, layout,
            original educational content, written materials, graphics,
            illustrations, images, videos and other original materials are
            owned by or licensed to Hustle Learning.
          </P>
          <P>All applicable intellectual property rights are reserved.</P>
          <P>
            You may access and use educational resources for personal,
            non-commercial learning purposes, subject to the applicable
            subscription or purchase conditions.
          </P>
          <P>You must not, without prior written permission:</P>
          <UL
            items={[
              "Reproduce or republish our original content.",
              "Distribute paid materials.",
              "Sell or commercially exploit our resources.",
              "Modify and redistribute our content.",
              "Remove copyright or ownership notices.",
              "Use our branding, logo or identity in a manner that implies an unauthorised association.",
            ]}
          />
          <P>
            Third-party trademarks, logos, textbook content and other materials
            remain the property of their respective owners.
          </P>
        </section>

        <section>
          <H2 id="third-party">13. Third-Party Services and External Links</H2>
          <P>
            Our website may contain links to third-party websites,
            applications, video platforms, payment gateways, educational
            resources or other external services.
          </P>
          <P>
            These services are independently operated and may have their own
            terms, privacy policies and practices.
          </P>
          <P>
            Hustle Learning does not control all third-party websites and is
            not responsible for their content, availability, security or
            policies.
          </P>
          <P>Accessing third-party services is at your own discretion.</P>
        </section>

        <section>
          <H2 id="availability">14. Website Availability and Technical Issues</H2>
          <P>
            We aim to keep the website and services available and functioning
            properly.
          </P>
          <P>However, uninterrupted access cannot be guaranteed.</P>
          <P>
            The website or certain features may occasionally be unavailable
            due to:
          </P>
          <UL
            items={[
              "Scheduled maintenance.",
              "Software updates.",
              "Hosting or server problems.",
              "Internet or connectivity failures.",
              "Cybersecurity incidents.",
              "Third-party service interruptions.",
              "Circumstances beyond our reasonable control.",
            ]}
          />
          <P>
            We reserve the right to modify, suspend or discontinue website
            features where reasonably necessary.
          </P>
          <P>
            We will make reasonable efforts to restore affected services when
            possible.
          </P>
        </section>

        <section>
          <H2 id="privacy-info">15. Privacy and Personal Information</H2>
          <P>
            Your use of Hustle Learning may involve the collection and
            processing of personal information, including:
          </P>
          <UL
            items={[
              "Name and contact information.",
              "Email address and phone number.",
              "Account and login information.",
              "Class, subject and academic preferences.",
              "Payment and transaction information.",
              "Enquiry details.",
              "Information required to arrange tutoring or classes.",
              "Website usage and technical information.",
            ]}
          />
          <P>We process personal information for purposes such as:</P>
          <UL
            items={[
              "Creating and managing user accounts.",
              "Providing educational services.",
              "Processing payments and purchases.",
              "Responding to enquiries.",
              "Arranging classes and tutoring.",
              "Providing service-related communications.",
              "Sending promotional updates where valid consent has been obtained.",
              "Maintaining website security and preventing fraud.",
              "Meeting applicable legal obligations.",
            ]}
          />
          <P>
            Personal information may be shared with relevant service providers,
            payment processors, tutors, delivery partners and other parties
            where reasonably necessary to provide the requested services or
            meet legal obligations.
          </P>
          <P>
            Further information about how we collect, use, store, share and
            protect personal information, as well as how users can exercise
            applicable privacy rights, is provided in our Privacy Policy.
          </P>
          <P>
            By using the website, you acknowledge that you should review the
            Privacy Policy before submitting personal information.
          </P>
        </section>

        <section>
          <H2 id="communications">16. Communications and Marketing</H2>
          <P>
            By submitting an enquiry or using our contact forms, you may
            authorise Hustle Learning to contact you regarding your enquiry
            through the contact details you provide.
          </P>
          <P>
            Where you separately opt in to promotional communications, we may
            also send:
          </P>
          <UL
            items={[
              "Course announcements.",
              "Educational updates.",
              "New study material notifications.",
              "Offers and promotions.",
              "Subscription and service updates.",
              "Other relevant information about Hustle Learning.",
            ]}
          />
          <P>
            Promotional consent is optional and is not a condition of
            submitting an enquiry or purchasing a service.
          </P>
          <P>
            You may withdraw your consent to promotional communications at any
            time by using an available unsubscribe option or contacting us.
          </P>
          <P>
            Service-related communications necessary to fulfil an order,
            manage an account or provide an active service may continue where
            permitted by law.
          </P>
        </section>

        <section>
          <H2 id="liability">17. Limitation of Liability</H2>
          <P>
            To the maximum extent permitted by applicable law, Hustle Learning
            will not be liable for indirect, incidental, special or
            consequential losses arising from the use of the website or
            services.
          </P>
          <P>We do not guarantee:</P>
          <UL
            items={[
              "Specific examination results or academic scores.",
              "Admission to any school, college or educational institution.",
              "Employment or career outcomes.",
              "Continuous availability of the website.",
              "That every educational resource will be suitable for every student's individual learning requirements.",
            ]}
          />
          <P>
            Academic performance depends on several factors, including
            individual effort, attendance, preparation, learning ability and
            examination conditions.
          </P>
          <P>
            Nothing in these Terms excludes or limits liability that cannot
            legally be excluded or limited under applicable law, including
            statutory consumer rights.
          </P>
        </section>

        <section>
          <H2 id="indemnification">18. Indemnification</H2>
          <P>
            To the extent permitted by applicable law, you agree to be
            responsible for losses, claims, liabilities or reasonable expenses
            arising directly from your unlawful use of the platform,
            infringement of third-party rights or material violation of these
            Terms.
          </P>
          <P>
            This section does not require you to indemnify Hustle Learning for
            losses caused by our own unlawful conduct or obligations that
            cannot legally be transferred to you.
          </P>
        </section>

        <section>
          <H2 id="suspension">19. Suspension and Termination</H2>
          <P>
            We may suspend, restrict or terminate your access to the website or
            any service if:
          </P>
          <UL
            items={[
              "You materially violate these Terms.",
              "You engage in fraudulent or unlawful activity.",
              "You misuse paid resources or access credentials.",
              "You engage in harassment, abuse or misconduct.",
              "Your actions create security or operational risks.",
              "Continued access is prohibited by law.",
            ]}
          />
          <P>
            Where reasonably appropriate, we may provide notice or an
            opportunity to resolve the issue before taking action.
          </P>
          <P>
            Termination does not remove any payment obligations or legal
            rights that arose before termination.
          </P>
          <P>
            Any refund following suspension or termination will be considered
            in accordance with the applicable service policy and applicable
            law.
          </P>
        </section>

        <section>
          <H2 id="changes">20. Changes to These Terms</H2>
          <P>
            We may update these Terms from time to time to reflect changes in
            our services, pricing, website functionality, business operations
            or applicable laws.
          </P>
          <P>
            Updated Terms will be published on this page with a revised
            “Last Updated” date.
          </P>
          <P>
            Where a change materially affects an existing paid service or user
            rights, we will take reasonable steps to communicate the change
            where required.
          </P>
          <P>
            Your continued use of the website after updated Terms become
            effective constitutes acceptance of the revised Terms to the extent
            permitted by law.
          </P>
        </section>

        <section>
          <H2 id="governing-law">21. Governing Law and Dispute Resolution</H2>
          <P>These Terms are governed by the laws of India.</P>
          <P>
            If you have a complaint, concern or dispute relating to Hustle
            Learning, we encourage you to contact us first so that we can
            attempt to resolve the matter directly.
          </P>
          <P>
            Nothing in these Terms prevents you from exercising your statutory
            rights or approaching the appropriate consumer protection
            authority, consumer commission or other competent forum.
          </P>
          <P>
            Subject to applicable law, disputes shall be subject to the
            jurisdiction of the competent courts at New Delhi, India.
          </P>
        </section>

        <section>
          <H2 id="grievance">22. Grievance Redressal and Contact Information</H2>
          <P>
            For questions, complaints, payment issues, refund requests, privacy
            concerns or other matters relating to these Terms, please contact:
          </P>
          <P>
            <strong className="text-text-primary">Hustle Learning</strong>
          </P>
          <P>
            Operated by:{" "}
            <strong className="text-text-primary">
              Vipin Nawal
            </strong>
          </P>
          <P>
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </P>
          <P>
            Phone:{" "}
            <a
              href={CONTACT_PHONE_HREF}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </P>
          <P>
            Grievance Contact:{" "}
            <strong className="text-text-primary">Vipin, Founder</strong>
          </P>
          <P>
            We will make reasonable efforts to acknowledge and address
            complaints within the timelines prescribed by applicable law.
          </P>
        </section>

        <section>
          <H2 id="general">23. General Provisions</H2>
          <H3>Severability</H3>
          <P>
            If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions will continue to apply to
            the extent permitted by law.
          </P>
          <H3>No Waiver</H3>
          <P>
            Failure to enforce any provision of these Terms does not constitute
            a waiver of our right to enforce that provision later.
          </P>
          <H3>Entire Agreement</H3>
          <P>
            These Terms, together with the applicable Privacy Policy, service
            descriptions, pricing information and specific purchase conditions,
            constitute the agreement governing your use of Hustle Learning.
          </P>
          <H3>Assignment</H3>
          <P>
            You may not transfer your rights or obligations under these Terms
            without our prior written consent.
          </P>
          <P>
            We may transfer or assign our rights and obligations where
            permitted by applicable law.
          </P>
          <H3>Force Majeure</H3>
          <P>
            We will not be responsible for delays or interruptions caused by
            events beyond our reasonable control, including natural disasters,
            government actions, internet disruptions, widespread technical
            failures or other unforeseen circumstances. This does not remove
            any mandatory consumer remedies under applicable law.
          </P>
        </section>

        <section>
          <P>
            <strong className="text-text-primary">
              By using Hustle Learning, you acknowledge that you have read and
              understood these Terms and Conditions and agree to comply with
              them.
            </strong>
          </P>
          <P>Thank you for choosing Hustle Learning.</P>
        </section>
        </div>
        <aside className="hidden min-w-0 self-start lg:sticky lg:top-24 lg:block lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto">
          <LegalTableOfContents entries={TERMS_TOC} />
        </aside>
      </div>
    </main>
  );
}
