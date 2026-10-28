export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-[860px] px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-[1.2px] text-text-muted">
        Legal
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        Last updated: October 2026
      </p>

      <div className="mt-8 flex flex-col gap-6 text-base leading-[1.6] text-text-secondary">
        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            1. Information we collect
          </h2>
          <p className="mt-2">
            When you submit an enquiry, we collect your name, WhatsApp number,
            class, the service you enquired about, and your email address if
            you choose to share it. We also record when the enquiry was made
            so our counsellors can follow up correctly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            2. How we use it
          </h2>
          <p className="mt-2">
            We use your details only to contact you about study material,
            online classes, home tuition, or books — including batch timings,
            fees, and counselling calls on WhatsApp, phone, or email. We do
            not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            3. Sharing and storage
          </h2>
          <p className="mt-2">
            Your details are shared only with the counsellors and tutors who
            need them to respond to your enquiry, and with the technical
            services that deliver our messages. We keep enquiry records only
            as long as needed for follow-up and legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            4. Your choices
          </h2>
          <p className="mt-2">
            You can ask us to correct your details, stop contacting you, or
            delete your enquiry information at any time — just reply to any of
            our messages or submit a fresh enquiry asking us to do so.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            5. Children&apos;s privacy
          </h2>
          <p className="mt-2">
            Our services support school students, so enquiries for children
            should be submitted by a parent or guardian using their own
            contact details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-text-primary">
            6. Changes to this policy
          </h2>
          <p className="mt-2">
            We may update this policy as our services evolve. The latest
            version will always be available on this page.
          </p>
        </section>
      </div>
    </main>
  );
}
