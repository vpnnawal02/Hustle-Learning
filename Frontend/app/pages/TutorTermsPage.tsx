import Link from "next/link";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import { PageTitle } from "../components/typography";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-10 scroll-mt-24">
      <h2 id={id} className="text-2xl leading-tight text-balance text-text-primary">
        {title}
      </h2>
      <div className="mt-3 flex max-w-[72ch] flex-col gap-2.5 text-[15px] leading-[1.7] text-text-secondary">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ol className="flex list-decimal flex-col gap-1.5 pl-5 marker:font-bold marker:text-text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default function TutorTermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="mx-auto w-full max-w-[var(--container-wide)] flex-1 px-4 py-10 md:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Join as a Tutor", href: "/join-as-tutor" },
            { label: "Tutor Terms and Conditions" },
          ]}
        />
        <PageTitle className="mt-6 max-w-[24ch]">
          Tutor Terms and Conditions
        </PageTitle>
        <p className="mt-3 text-sm text-text-muted">Last Updated: 19 November 2026</p>
        <p className="mt-4 max-w-[72ch] text-base leading-[1.7] text-text-secondary">
          These Terms and Conditions govern the registration and participation
          of tutors associated with Hustle Learning. By registering as a tutor,
          accepting a tuition assignment or using Hustle Learning&apos;s tutor
          facilitation services, you acknowledge that you have read, understood
          and agreed to these Terms and Conditions.
        </p>

        <Section id="about" title="1. About Hustle Learning">
          <p>
            Hustle Learning is an educational platform that facilitates
            connections between tutors and parents or students seeking
            personalised academic support, across both home tuition and online
            tuition opportunities. The platform helps tutors discover suitable
            student requirements based on their qualifications, teaching
            subjects, preferred locations, availability and other relevant
            criteria. Hustle Learning does not guarantee employment, a fixed
            income or a minimum number of tuition assignments.
          </p>
        </Section>

        <Section id="eligibility" title="2. Eligibility Criteria">
          <p>To register as a tutor, an applicant must:</p>
          <List
            items={[
              "Be at least 18 years of age.",
              "Possess adequate knowledge of the subjects they intend to teach.",
              "Provide accurate personal, educational and professional information.",
              "Be legally eligible to provide tutoring services.",
              "Submit the required identity and educational documents.",
              "Agree to follow Hustle Learning's tutor policies and professional conduct requirements.",
            ]}
          />
          <p>
            College students, graduates, experienced teachers and subject
            specialists may register, provided they meet the eligibility
            requirements. Hustle Learning reserves the right to reject
            applications that do not meet its eligibility or verification
            requirements.
          </p>
        </Section>

        <Section id="free-registration" title="3. Free Registration">
          <List
            items={[
              "Tutor registration with Hustle Learning is completely free.",
              "No registration fee or account activation fee is charged.",
              "No advance payment is required merely to register.",
              "Registration does not guarantee approval or allocation of a tuition assignment.",
              "Tutor profiles may be reviewed before being considered for tuition opportunities.",
            ]}
          />
        </Section>

        <Section id="first-placement" title="4. First Student Placement – Commission-Free">
          <p>
            Hustle Learning provides one commission-free student placement to
            every eligible registered tutor:
          </p>
          <List
            items={[
              "The first successful student placement introduced through Hustle Learning is completely commission-free.",
              "The tutor retains 100% of the agreed first month's tuition fee.",
              "No placement commission is payable to Hustle Learning for this first student.",
              "The benefit applies once per eligible tutor, not once per subject or tuition format.",
              "The benefit cannot be transferred between tutors or accounts.",
              "The first-placement benefit cannot be claimed for an existing private student who was not introduced through Hustle Learning.",
              "The benefit does not mean that the student's tuition is free. The parent remains responsible for paying the agreed tuition fee.",
            ]}
          />
        </Section>

        <Section id="commission" title="5. Commission on Second and Subsequent Placements">
          <p>
            For the second and every subsequent successful student placement
            introduced through Hustle Learning, a placement commission equal to
            50% of the agreed first month&apos;s tuition fee will be payable —
            first placement 0%, second and subsequent placements 50% each. The
            commission is charged only once for that student placement; no
            recurring placement commission is charged for subsequent monthly
            payments from the same student under the same continuous tuition
            arrangement.
          </p>
        </Section>

        <Section id="commission-payment" title="6. Commission Payment Policy">
          <List
            items={[
              "Parents pay tuition fees directly to tutors.",
              "Tutors are responsible for collecting tuition fees from parents.",
              "Where a placement commission is applicable, the tutor must pay it directly to Hustle Learning.",
              "Commission payment becomes due after the tutor has received the complete first month's agreed tuition fee from the parent.",
              "Tutors must settle the applicable commission promptly after receiving the complete first month's tuition fee.",
              "Tutors must not deliberately delay, conceal or misrepresent tuition fee receipts to avoid commission obligations.",
              "Hustle Learning may request reasonable confirmation of tuition payment for commission reconciliation.",
            ]}
          />
          <p>
            Any applicable taxes will be handled in accordance with applicable
            law and the relevant invoicing arrangements.
          </p>
        </Section>

        <Section id="discontinuation" title="7. Student Discontinuation During the First Month">
          <p>
            The commission obligation for a qualifying placement remains payable
            even if a student discontinues tuition during the first month. The
            commission is calculated using the agreed first month&apos;s tuition
            fee and becomes payable after the tutor receives the complete first
            month&apos;s agreed tuition fee. The tutor must inform Hustle
            Learning if a student discontinues, and any fee adjustment, refund
            or payment dispute must be communicated to Hustle Learning.
          </p>
        </Section>

        <Section id="assignment" title="8. Tuition Assignment and Acceptance">
          <List
            items={[
              "Hustle Learning may communicate tuition opportunities based on tutor profiles and student requirements.",
              "Tutors are free to review each assignment before accepting it.",
              "Tutors may decline an assignment if it does not match their requirements, schedule, location or subject expertise.",
              "Tutors are requested to provide a reason when declining an assignment.",
              "Declining an assignment does not automatically result in a penalty.",
              "Tutors must not accept assignments for subjects they are not adequately qualified to teach.",
              "Assignment details — class, subjects, location, format, schedule and approved fee — should be communicated before acceptance.",
              "No assignment should be treated as confirmed until the tutor and parent have agreed to the relevant arrangements.",
            ]}
          />
        </Section>

        <Section id="fee-policy" title="9. Tuition Fee and Pricing Policy">
          <List
            items={[
              "Tutors may propose their expected tuition fees during registration.",
              "Hustle Learning will review and approve the proposed fees.",
              "The approved fee will be communicated before the tutor accepts an assignment.",
              "Tutors must not independently change an agreed fee without communicating with the parent and Hustle Learning.",
              "Any revised fee must be mutually agreed upon before it takes effect.",
              "Parents and tutors must agree on the tuition schedule, payment frequency and other arrangements before starting tuition.",
            ]}
          />
        </Section>

        <Section id="formats" title="10. Home and Online Tuition">
          <p>
            <strong className="text-text-primary">Home Tuition.</strong> Home
            tuition opportunities are initially available across Delhi. Actual
            assignments depend on student requirements and tutor availability.
            Tutors must specify preferred locations and travel preferences, and
            the parent and tutor must mutually agree on the teaching location
            and schedule.
          </p>
          <p>
            <strong className="text-text-primary">Online Tuition.</strong>{" "}
            Tutors may register for online teaching opportunities and must have
            suitable internet connectivity and equipment. The platform and
            schedule should be mutually agreed upon, and tutors must maintain
            appropriate teaching standards during online sessions.
          </p>
        </Section>

        <Section id="responsibilities" title="11. Tutor Responsibilities">
          <p>Every registered tutor agrees to:</p>
          <List
            items={[
              "Provide genuine and accurate information during registration.",
              "Maintain sufficient subject knowledge.",
              "Prepare appropriately for tuition sessions.",
              "Be punctual and consistent.",
              "Follow the mutually agreed schedule.",
              "Communicate professionally with parents and students.",
              "Maintain appropriate professional boundaries.",
              "Treat students respectfully and without discrimination.",
              "Notify parents about unavoidable absences or schedule changes.",
              "Avoid making false promises regarding academic results.",
              "Maintain confidentiality regarding student and family information.",
              "Follow applicable safety and professional conduct requirements.",
            ]}
          />
        </Section>

        <Section id="verification" title="12. Identity and Educational Verification">
          <List
            items={[
              "Tutors must submit acceptable identity documentation.",
              "Tutors must submit relevant educational certificates or supporting academic documents.",
              "All submitted documents must be genuine and valid.",
              "Hustle Learning may request additional information where necessary.",
              "Verification may be declined if documents are incomplete, inconsistent or appear to be inaccurate.",
              "Tutors must not misrepresent their educational qualifications or professional experience.",
              "Approval of a tutor profile does not guarantee a tuition assignment.",
            ]}
          />
          <p>
            Hustle Learning will handle submitted documents in accordance with
            its Privacy Policy and applicable data protection requirements.
          </p>
        </Section>

        <Section id="safety" title="13. Student Safety and Professional Conduct">
          <p>
            Tutors may work with students who are minors. Accordingly, tutors
            must maintain professional relationships, avoid inappropriate
            personal communication, physical contact or conduct, respect student
            privacy and dignity, never engage in harassment, discrimination,
            intimidation or abuse, avoid recording or publishing student
            information without parental permission, respect reasonable parental
            instructions, and report serious safeguarding concerns through
            appropriate channels. Any serious complaint or substantiated
            misconduct may result in immediate suspension while the matter is
            reviewed.
          </p>
        </Section>

        <Section id="existing-students" title="14. Existing Students and Platform-Generated Placements">
          <List
            items={[
              "Existing private students of a tutor are not eligible for the commission-free first-placement benefit.",
              "Tutors must not present existing personal students as new Hustle Learning leads.",
              "Tutors must not submit independently acquired student enquiries as platform-generated placements.",
              "A student introduced through Hustle Learning remains subject to the applicable placement commission even if subsequent communication and fee collection happen directly between tutor and parent.",
              "Tutors must not deliberately bypass Hustle Learning to avoid applicable commission payments.",
            ]}
          />
        </Section>

        <Section id="cancellation" title="15. Cancellation and Discontinuation">
          <List
            items={[
              "Tutors must inform parents and Hustle Learning if they cannot continue an assignment.",
              "Tutors should provide reasonable advance notice wherever possible.",
              "Repeated unexplained absences or abandonment of assignments may affect future eligibility.",
              "Tutors must communicate student discontinuation promptly.",
              "The applicable placement commission remains payable according to Section 7.",
              "Refunds, adjustments or payment disputes must be addressed between the relevant parties under their agreed arrangements.",
            ]}
          />
        </Section>

        <Section id="privacy" title="16. Privacy and Confidentiality">
          <p>
            Tutors agree to keep student and parent information confidential,
            use personal information only for legitimate tuition-related
            purposes, avoid sharing details with unauthorised individuals,
            protect documents and communication records, and follow Hustle
            Learning&apos;s Privacy Policy. Hustle Learning processes tutor
            information for registration, verification, matching, communication
            and administration as described in its Privacy Policy.
          </p>
        </Section>

        <Section id="suspension" title="17. Suspension and Termination">
          <p>
            Hustle Learning may suspend or terminate a tutor&apos;s registration
            for false information, fraudulent documents, serious misconduct,
            safety violations, repeated substantiated complaints, deliberate
            commission evasion, misuse of information, repeated failure to
            fulfil assignments, or breach of these Terms. Suspension or
            termination does not remove outstanding payment obligations from
            previously accepted assignments.
          </p>
        </Section>

        <Section id="relationship" title="18. Independent Service Provider Relationship">
          <p>
            Tutors participate as independent service providers. Registration
            does not create an employer-employee, partnership, agency or joint
            venture relationship. Tutors are responsible for their own teaching
            services, professional obligations and personal tax
            responsibilities. Hustle Learning facilitates introductions but does
            not guarantee employment, income or continuous assignments.
          </p>
        </Section>

        <Section id="liability" title="19. Limitation of Responsibility">
          <p>
            Hustle Learning acts as a facilitator; the teaching arrangement is
            agreed between tutor and parent. Hustle Learning does not guarantee
            a minimum number of assignments, fixed income, academic results,
            continuous engagement or uninterrupted arrangements. Nothing here
            excludes liability where prohibited by applicable law.
          </p>
        </Section>

        <Section id="changes" title="20. Changes to These Terms">
          <p>
            Hustle Learning may update these Terms when necessary. Material
            changes to commission, payment or placement arrangements will be
            communicated to registered tutors before they apply to new
            assignments.
          </p>
        </Section>

        <Section id="law" title="21. Governing Law and Jurisdiction">
          <p>
            These Terms are governed by the laws of India. Subject to
            applicable law, disputes are subject to the jurisdiction of
            competent courts in Delhi, India.
          </p>
        </Section>

        <Section id="acceptance" title="22. Acceptance">
          <p>
            By submitting the tutor registration form, the applicant confirms
            they have read and understood these Terms, provided accurate
            information, understand that registration is free, the first
            placement is commission-free, subsequent placements carry a one-time
            50% commission, parents pay tutors directly, commissions are due
            after receiving the complete first month&apos;s fee, and they agree
            to the conduct, safety and privacy requirements.
          </p>
          <p>
            For queries relating to tutor registration, placements, commissions
            or these Terms, please use the official contact channels on the
            Hustle Learning website.
          </p>
        </Section>

        <p className="mt-10 max-w-[68ch] text-[15px] leading-[1.6] text-text-secondary">
          Ready to join?{" "}
          <Link
            href="/join-as-tutor/register"
            className="font-semibold text-text-primary underline underline-offset-4"
          >
            Register as a tutor
          </Link>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}
