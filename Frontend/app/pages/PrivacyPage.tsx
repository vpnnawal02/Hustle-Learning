import { PageTitle } from "../components/typography";

const CONTACT_EMAIL = "hustlelearning.info@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 88519 48143";
const CONTACT_PHONE_HREF = "tel:+918851948143";
const SITE_URL_LABEL = "https://www.hustlelearning.in";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-lg font-semibold text-text-primary">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-sans text-base font-semibold text-text-primary">
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-narrow)] px-4 py-10 md:px-6 md:py-14">
      <PageTitle>Privacy Policy</PageTitle>
      <p className="mt-2 text-sm font-semibold text-text-muted">
        Last Updated: 19 November 2026
      </p>

      <div className="mt-8 flex max-w-[68ch] flex-col gap-6 text-base leading-[1.6] text-text-secondary">
        <section>
          <P>
            At Hustle Learning, we respect your privacy and are committed to
            protecting the personal information you share with us.
          </P>
          <P>
            This Privacy Policy explains how Hustle Learning collects, uses,
            stores, processes, shares and protects personal information when
            you visit our website, create an account, submit an enquiry,
            purchase a subscription, enrol in an online class, request tutoring
            services or interact with our platform.
          </P>
          <P>
            Hustle Learning is independently operated by{" "}
            <strong className="text-text-primary">Vipin Nawal</strong>, based
            in India.
          </P>
          <P>
            By accessing or using our website and services, you acknowledge
            that you have read this Privacy Policy.
          </P>
          <P>
            Please read this document carefully to understand our privacy
            practices.
          </P>
        </section>

        <section>
          <H2>1. Information About Us</H2>
          <P>
            <strong className="text-text-primary">Platform Name:</strong>{" "}
            Hustle Learning
          </P>
          <P>
            <strong className="text-text-primary">Website:</strong>{" "}
            {SITE_URL_LABEL}
          </P>
          <P>
            <strong className="text-text-primary">Operated By:</strong> Vipin
            Nawal
          </P>
          <P>
            <strong className="text-text-primary">Email:</strong>{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </P>
          <P>
            <strong className="text-text-primary">Phone:</strong>{" "}
            <a
              href={CONTACT_PHONE_HREF}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </P>
          <P>
            For privacy-related questions, requests or complaints, you may
            contact us using the details provided above.
          </P>
        </section>

        <section>
          <H2>2. Information We Collect</H2>
          <P>
            We collect personal information that is reasonably necessary to
            operate our website, provide educational services, process
            transactions and communicate with users.
          </P>
          <P>
            The information we collect depends on how you interact with Hustle
            Learning.
          </P>
          <H3>2.1 Personal and Contact Information</H3>
          <P>
            When you submit a contact form, register for a service or
            communicate with us, we may collect:
          </P>
          <UL
            items={[
              "Full name.",
              "Email address.",
              "Mobile number.",
              "City and location.",
              "Class or grade.",
              "Subject or course preferences.",
              "Enquiry details.",
              "Any additional information voluntarily provided by you.",
            ]}
          />
          <H3>2.2 Account Information</H3>
          <P>
            If you create an account on Hustle Learning, we may collect:
          </P>
          <UL
            items={[
              "Name and contact details.",
              "Username or account identifier.",
              "Login credentials or authentication-related information.",
              "Account preferences.",
              "Subscription status.",
              "Account activity and service usage information.",
            ]}
          />
          <P>
            We do not intentionally request your account passwords through
            contact forms, emails or unofficial communication channels.
          </P>
          <H3>2.3 Educational Information</H3>
          <P>
            To provide relevant educational services, we may collect
            information such as:
          </P>
          <UL
            items={[
              "Student's class or grade.",
              "Academic board or curriculum.",
              "Subjects of interest.",
              "Learning requirements.",
              "Tutoring preferences.",
              "Class enrolment details.",
              "Academic goals or other information voluntarily shared with us.",
            ]}
          />
          <P>
            This information helps us understand your educational requirements
            and recommend suitable learning resources or services.
          </P>
          <H3>2.4 Payment and Transaction Information</H3>
          <P>
            When you purchase a subscription, enrol in an online class, request
            tutoring or purchase physical books, we may collect
            transaction-related information, including:
          </P>
          <UL
            items={[
              "Payment amount.",
              "Transaction ID.",
              "Order ID.",
              "Purchase date.",
              "Subscription plan.",
              "Payment status.",
              "Billing information, where required.",
              "Refund or cancellation details.",
            ]}
          />
          <P>
            Payments may be processed through third-party payment gateways.
          </P>
          <P>
            We do not intend to collect or store complete debit card numbers,
            credit card numbers, CVV codes or payment passwords on our own
            systems. Such sensitive payment credentials should be handled by
            the relevant payment provider.
          </P>
          <H3>2.5 Tutoring and Service Information</H3>
          <P>
            If you request personal home tutoring or personal online tutoring,
            we may collect additional information required to arrange the
            service, such as:
          </P>
          <UL
            items={[
              "Preferred subjects and class.",
              "Preferred teaching schedule.",
              "General location or service address, where required for home tutoring.",
              "Preferred mode of instruction.",
              "Communication and scheduling preferences.",
              "Information required to coordinate with an assigned tutor.",
            ]}
          />
          <P>
            We use this information only as reasonably necessary to arrange and
            manage the requested tutoring service.
          </P>
          <H3>2.6 Technical and Website Usage Information</H3>
          <P>
            When you visit our website, certain technical information may be
            collected automatically by our hosting provider, website
            infrastructure or other tools we use.
          </P>
          <P>
            Depending on the tools configured on our website, this may include:
          </P>
          <UL
            items={[
              "IP address.",
              "Browser type and version.",
              "Device type.",
              "Operating system.",
              "Pages visited.",
              "Date and time of access.",
              "Referring website.",
              "General website interaction information.",
              "Technical error and diagnostic information.",
            ]}
          />
          <P>
            This information may be used to maintain website functionality,
            identify technical issues, improve performance and protect the
            platform against misuse.
          </P>
          <H3>2.7 Communication Information</H3>
          <P>
            We may retain information contained in communications between you
            and Hustle Learning, including:
          </P>
          <UL
            items={[
              "Emails.",
              "Contact form submissions.",
              "WhatsApp or other business messages.",
              "Customer support requests.",
              "Feedback and complaints.",
              "Service-related correspondence.",
            ]}
          />
          <P>
            This information helps us respond to enquiries, manage services and
            maintain relevant business records.
          </P>
        </section>

        <section>
          <H2>3. How We Use Your Information</H2>
          <P>
            We use collected information for legitimate business and
            service-related purposes, including the following.
          </P>
          <H3>3.1 Providing Educational Services</H3>
          <P>We use your information to:</P>
          <UL
            items={[
              "Provide access to educational resources.",
              "Manage subscriptions.",
              "Facilitate online batch classes.",
              "Arrange personal online tutoring.",
              "Arrange personal home tutoring.",
              "Process physical book orders.",
              "Respond to academic enquiries.",
              "Provide relevant service information.",
            ]}
          />
          <H3>3.2 Account Management</H3>
          <P>We use account-related information to:</P>
          <UL
            items={[
              "Create and manage user accounts.",
              "Authenticate users.",
              "Maintain account preferences.",
              "Provide access to purchased services.",
              "Manage subscriptions and renewals.",
              "Address account-related problems.",
              "Prevent unauthorised account access.",
            ]}
          />
          <H3>3.3 Payment Processing</H3>
          <P>Transaction information may be used to:</P>
          <UL
            items={[
              "Verify payments.",
              "Confirm purchases.",
              "Activate subscriptions.",
              "Maintain payment records.",
              "Process eligible refunds.",
              "Resolve billing disputes.",
              "Prevent fraudulent transactions.",
            ]}
          />
          <H3>3.4 Communication and Customer Support</H3>
          <P>We may use your contact information to:</P>
          <UL
            items={[
              "Respond to enquiries.",
              "Confirm registrations and purchases.",
              "Share class schedules.",
              "Communicate tutoring arrangements.",
              "Provide order updates.",
              "Address complaints.",
              "Notify users about important service changes.",
            ]}
          />
          <H3>3.5 Website Improvement and Security</H3>
          <P>Technical information may be used to:</P>
          <UL
            items={[
              "Monitor website performance.",
              "Identify errors and technical issues.",
              "Improve website usability.",
              "Protect the website against unauthorised access.",
              "Detect suspicious activity.",
              "Maintain the security and reliability of our services.",
            ]}
          />
          <H3>3.6 Promotional Communications</H3>
          <P>
            Where you have separately opted in, we may use your contact
            information to send:
          </P>
          <UL
            items={[
              "New course announcements.",
              "Educational updates.",
              "New study material notifications.",
              "Subscription offers.",
              "Discounts and promotional campaigns.",
              "Online class announcements.",
              "Other relevant Hustle Learning updates.",
            ]}
          />
          <P>Promotional communications are optional.</P>
          <P>
            You may withdraw your marketing consent at any time by contacting
            us or using the unsubscribe mechanism where available.
          </P>
          <P>
            Withdrawing marketing consent will not necessarily stop essential
            communications relating to an active purchase, account or service.
          </P>
        </section>

        <section>
          <H2>4. Contact Forms and Consent</H2>
          <P>
            When you submit a contact form on Hustle Learning, we collect the
            information you provide so that we can understand and respond to
            your enquiry.
          </P>
          <P>
            Our contact form may request information such as your name, email
            address, phone number, class, subject and message.
          </P>
          <P>We may use this information to:</P>
          <UL
            items={[
              "Respond to your enquiry.",
              "Provide information about our services.",
              "Understand your educational requirements.",
              "Contact you regarding the service you requested.",
            ]}
          />
          <H3>4.1 Enquiry Consent</H3>
          <P>
            Submitting a contact form requires acknowledgement of our Terms and
            Conditions and Privacy Policy, together with consent to the use of
            the submitted information for handling your enquiry.
          </P>
          <H3>4.2 Promotional Consent</H3>
          <P>
            We may provide a separate optional checkbox for promotional
            communications.
          </P>
          <P>
            If you select this option, you agree to receive relevant updates,
            announcements, offers and promotional messages through available
            communication channels, including email, SMS, WhatsApp or phone.
          </P>
          <P>Promotional consent is not mandatory for submitting an enquiry.</P>
          <P>You may withdraw this consent at any time.</P>
        </section>

        <section>
          <H2>5. Cookies and Similar Technologies</H2>
          <P>
            Our website or the third-party services integrated with it may use
            cookies or similar technologies to support website functionality
            and improve the browsing experience.
          </P>
          <P>
            Cookies are small data files stored on your device when you visit
            certain websites.
          </P>
          <P>
            Depending on the technologies implemented, cookies may be used for:
          </P>
          <UL
            items={[
              "Essential website functionality.",
              "User authentication.",
              "Session management.",
              "Remembering preferences.",
              "Website performance monitoring.",
              "Understanding website usage.",
              "Analytics and improvement purposes.",
            ]}
          />
          <P>
            Some cookies may be placed by third-party services integrated into
            our website.
          </P>
          <P>
            You may manage or restrict cookies through your browser settings.
            However, disabling certain cookies may affect website functionality
            or prevent some features from working correctly.
          </P>
          <P>
            Where required by applicable law, we will obtain the necessary
            consent before using non-essential cookies or similar technologies.
          </P>
        </section>

        <section>
          <H2>6. Sharing and Disclosure of Information</H2>
          <P>
            Hustle Learning does not sell personal information to third
            parties.
          </P>
          <P>
            However, we may share relevant information with third parties when
            necessary to operate our website, provide services, process
            transactions or comply with legal obligations.
          </P>
          <P>These parties may include the following.</P>
          <H3>6.1 Payment Service Providers</H3>
          <P>
            We may share relevant transaction information with payment gateways
            and payment service providers to process payments, verify
            transactions, handle refunds and prevent payment fraud.
          </P>
          <P>
            Such providers process information according to their own privacy
            policies and applicable requirements.
          </P>
          <H3>6.2 Tutors and Educational Service Providers</H3>
          <P>
            When you request personal tutoring or enrol in a class, relevant
            information may be shared with the assigned tutor or educational
            service provider.
          </P>
          <P>This may include:</P>
          <UL
            items={[
              "Student's name.",
              "Class and subjects.",
              "Academic requirements.",
              "Preferred schedule.",
              "Relevant contact details.",
              "Location information where required for home tutoring.",
            ]}
          />
          <P>
            We share only information reasonably necessary to coordinate and
            deliver the requested service.
          </P>
          <H3>6.3 Website Hosting and Technology Providers</H3>
          <P>We may use third-party providers for:</P>
          <UL
            items={[
              "Website hosting.",
              "Database management.",
              "Authentication.",
              "Website maintenance.",
              "Email delivery.",
              "Technical support.",
              "Security monitoring.",
              "Data storage.",
            ]}
          />
          <P>
            Such providers may process certain information on our behalf to
            perform their services.
          </P>
          <H3>6.4 Delivery and Logistics Providers</H3>
          <P>
            For physical book orders, relevant information may be shared with
            delivery partners, courier companies or logistics providers.
          </P>
          <P>
            This may include the recipient&apos;s name, phone number and
            delivery address.
          </P>
          <H3>6.5 Legal and Regulatory Authorities</H3>
          <P>
            We may disclose personal information where required or permitted by
            applicable law, including:
          </P>
          <UL
            items={[
              "In response to lawful requests from government authorities.",
              "To comply with court orders or legal proceedings.",
              "To investigate suspected fraud or unlawful activity.",
              "To protect the rights, property or safety of Hustle Learning, its users or others.",
            ]}
          />
          <H3>6.6 Business and Operational Requirements</H3>
          <P>
            If Hustle Learning undergoes a restructuring, transfer of
            operations or similar business change, relevant information may be
            transferred where legally permitted and subject to appropriate
            safeguards.
          </P>
        </section>

        <section>
          <H2>7. Data Storage and Retention</H2>
          <P>
            We retain personal information only for as long as reasonably
            necessary for the purposes for which it was collected, including
            providing services, maintaining accounts, processing transactions,
            resolving disputes and complying with legal obligations.
          </P>
          <P>
            Different categories of information may be retained for different
            periods.
          </P>
          <P>For example:</P>
          <UL
            items={[
              "Account information may be retained while your account remains active.",
              "Transaction records may be retained for accounting, tax and legal requirements.",
              "Contact enquiries may be retained for follow-up and customer support.",
              "Tutoring information may be retained while the relevant service is being arranged or delivered.",
              "Promotional contact information may be retained until you withdraw consent or it is no longer needed.",
              "Technical records may be retained for security, troubleshooting and operational purposes.",
            ]}
          />
          <P>
            When information is no longer reasonably necessary, we will take
            appropriate steps to delete it or otherwise dispose of it securely,
            subject to applicable legal retention requirements.
          </P>
          <P>
            Where immediate deletion is not technically or legally possible, we
            will restrict further use where appropriate.
          </P>
        </section>

        <section>
          <H2>8. Data Security</H2>
          <P>
            We take reasonable measures to protect personal information against
            unauthorised access, misuse, alteration, disclosure or loss.
          </P>
          <P>
            Depending on the systems and services implemented, security
            measures may include:
          </P>
          <UL
            items={[
              "Access restrictions.",
              "Secure authentication practices.",
              "Appropriate hosting and database protections.",
              "Security updates and maintenance.",
              "Limited access to personal information.",
              "Secure payment processing through payment providers.",
              "Monitoring for suspicious activity.",
              "Appropriate data handling procedures.",
            ]}
          />
          <P>
            No website, online platform or electronic storage system can be
            guaranteed to be completely secure.
          </P>
          <P>
            Although we take reasonable precautions, we cannot guarantee
            absolute security against every possible cybersecurity incident or
            unauthorised access attempt.
          </P>
          <P>
            If a personal data breach occurs, we will take appropriate steps in
            accordance with applicable law.
          </P>
        </section>

        <section>
          <H2>9. Children&apos;s Privacy</H2>
          <P>
            Hustle Learning provides educational resources and services that
            may be used by students below the age of 18.
          </P>
          <P>
            We recognise that children&apos;s personal information requires
            particular care.
          </P>
          <P>
            We collect student-related information only to the extent
            reasonably necessary to provide educational resources, manage
            accounts, respond to enquiries, arrange tutoring and deliver other
            requested services.
          </P>
          <P>
            We do not intentionally request unnecessary personal information
            from students.
          </P>
          <P>
            Where applicable law requires verifiable parental or legal guardian
            consent, age verification or additional safeguards before
            processing a child&apos;s personal information, we will follow
            those requirements.
          </P>
          <P>
            We do not knowingly use children&apos;s personal information for
            targeted advertising or behavioural monitoring where prohibited by
            applicable law.
          </P>
          <P>
            If you believe that a child has provided personal information in
            circumstances that should not have occurred, please contact us so
            that we can review the matter and take appropriate action.
          </P>
        </section>

        <section>
          <H2>10. Your Privacy Rights and Choices</H2>
          <P>
            Subject to applicable law, you may have rights regarding your
            personal information.
          </P>
          <P>These may include:</P>
          <H3>10.1 Access and Information</H3>
          <P>
            You may request information about personal information associated
            with your account or interactions with Hustle Learning.
          </P>
          <H3>10.2 Correction</H3>
          <P>
            You may request correction of inaccurate or incomplete personal
            information.
          </P>
          <H3>10.3 Updating Information</H3>
          <P>
            You may request that your contact details or other relevant account
            information be updated.
          </P>
          <H3>10.4 Withdrawal of Consent</H3>
          <P>
            Where we process information based on your consent, you may
            withdraw that consent, subject to applicable legal requirements.
          </P>
          <P>
            Withdrawal of consent does not affect the lawfulness of processing
            that occurred before withdrawal.
          </P>
          <P>
            It may also affect our ability to provide certain services that
            depend on the relevant information.
          </P>
          <H3>10.5 Deletion</H3>
          <P>
            You may request deletion of personal information where applicable.
          </P>
          <P>
            Certain information may need to be retained to meet legal,
            regulatory, accounting or legitimate record-keeping requirements.
          </P>
          <H3>10.6 Marketing Preferences</H3>
          <P>You may opt out of promotional communications at any time.</P>
          <P>
            We will continue to send essential service-related communications
            where necessary and legally permitted.
          </P>
          <H3>10.7 Grievances</H3>
          <P>
            You may contact us if you believe that your personal information
            has been handled improperly or your privacy rights have not been
            respected.
          </P>
          <P>
            We will review and respond to requests in accordance with
            applicable legal requirements.
          </P>
        </section>

        <section>
          <H2>11. Third-Party Websites and Services</H2>
          <P>
            Our website may contain links to external websites, applications,
            educational platforms, payment providers or other third-party
            services.
          </P>
          <P>
            These services operate independently and have their own privacy
            policies and data handling practices.
          </P>
          <P>
            Hustle Learning does not control the privacy practices, security or
            content of third-party websites.
          </P>
          <P>
            We recommend reviewing the relevant privacy policy before
            submitting personal information to an external service.
          </P>
        </section>

        <section>
          <H2>12. International Data Transfers</H2>
          <P>
            Some third-party technology providers or service infrastructure may
            process or store information outside India.
          </P>
          <P>
            Where personal information is transferred or processed outside
            India, we will take appropriate steps to comply with applicable
            Indian laws and any relevant restrictions or requirements imposed
            by competent authorities.
          </P>
        </section>

        <section>
          <H2>13. Data Breach and Security Incidents</H2>
          <P>
            We take reasonable precautions to prevent unauthorised access to
            personal information.
          </P>
          <P>
            However, if a security incident or personal data breach occurs, we
            will assess the incident and take appropriate steps to contain,
            investigate and address it.
          </P>
          <P>
            Where notification is required by applicable law, we will notify
            the relevant individuals and authorities within the prescribed
            timelines and through appropriate communication channels.
          </P>
        </section>

        <section>
          <H2>14. Changes to This Privacy Policy</H2>
          <P>We may update this Privacy Policy from time to time to reflect:</P>
          <UL
            items={[
              "Changes in our services.",
              "Changes in website functionality.",
              "New technologies or service providers.",
              "Changes in data collection practices.",
              "Changes in applicable laws or regulations.",
            ]}
          />
          <P>
            The updated version will be published on this page with a revised
            “Last Updated” date.
          </P>
          <P>We encourage users to review this page periodically.</P>
          <P>
            Where required, we will provide additional notice or seek consent
            for material changes in our data processing practices.
          </P>
        </section>

        <section>
          <H2>15. Contact Us and Privacy Complaints</H2>
          <P>
            If you have questions about this Privacy Policy, want to exercise
            your privacy rights, request correction or deletion of personal
            information, withdraw consent or raise a privacy complaint, please
            contact us.
          </P>
          <P>
            <strong className="text-text-primary">Hustle Learning</strong>
          </P>
          <P>
            <strong className="text-text-primary">Operated by:</strong> Vipin
            Nawal
          </P>
          <P>
            <strong className="text-text-primary">Website:</strong>{" "}
            {SITE_URL_LABEL}
          </P>
          <P>
            <strong className="text-text-primary">Email:</strong>{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_EMAIL}
            </a>
          </P>
          <P>
            <strong className="text-text-primary">Phone:</strong>{" "}
            <a
              href={CONTACT_PHONE_HREF}
              className="font-medium text-text-primary underline underline-offset-2"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </P>
          <P>
            <strong className="text-text-primary">
              Privacy / Grievance Contact:
            </strong>{" "}
            Vipin, Founder
          </P>
          <P>
            We will make reasonable efforts to acknowledge and resolve
            privacy-related requests and complaints within the time limits
            prescribed by applicable law.
          </P>
        </section>

        <section>
          <P>
            <strong className="text-text-primary">
              Your privacy matters to us.
            </strong>{" "}
            We are committed to handling personal information responsibly and
            using it only for appropriate educational, operational and
            service-related purposes.
          </P>
          <P>Thank you for trusting Hustle Learning.</P>
        </section>
      </div>
    </main>
  );
}
