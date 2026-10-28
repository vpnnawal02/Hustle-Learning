export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-[860px] px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Last updated: October 2026
      </p>

      <div className="mt-8 flex flex-col gap-6 text-base leading-[1.6] text-text-secondary">
        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            1. What Hustle Learning offers
          </h2>
          <p className="mt-2">
            Hustle Learning provides study material and notes, online classes
            and courses, personal home tuition, and educational books for
            school students. By submitting an enquiry or using our services,
            you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            2. Enquiries and callbacks
          </h2>
          <p className="mt-2">
            When you share your name, WhatsApp number, email address, and class
            through our enquiry form, you agree to be contacted by Hustle
            Learning on call, WhatsApp, or email about our learning options.
            You must share accurate details and your own (or your
            child&apos;s, if you are a parent) contact information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            3. Fair use
          </h2>
          <p className="mt-2">
            Study material, class recordings, and books are for the
            student&apos;s personal learning only. Please do not copy,
            resell, or publicly distribute our content without written
            permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            4. Fees and batches
          </h2>
          <p className="mt-2">
            Fees, batch timings, tutor availability, and book prices shared
            during counselling are confirmed at the time of enrolment. We may
            update batches or schedules and will inform enrolled students in
            advance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            5. Honest expectations
          </h2>
          <p className="mt-2">
            We work hard to support every student&apos;s learning, but we do
            not guarantee specific marks, ranks, or admissions. Progress
            depends on regular study and participation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            6. Changes to these terms
          </h2>
          <p className="mt-2">
            We may update these terms as our services grow. Continued use of
            Hustle Learning after an update means you accept the revised
            terms. For questions, contact us through the enquiry form on the
            homepage.
          </p>
        </section>
      </div>
    </main>
  );
}
