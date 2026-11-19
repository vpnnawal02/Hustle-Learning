import SplitShell from "./forms/SplitShell";
import TutorRegistrationWizard from "./join-as-tutor/TutorRegistrationWizard";
import registerImg from "../assets/images/forms/tutor-registration-form.png";

export default function TutorRegisterPage() {
  return (
    <SplitShell
      headline="Start Earning Through Teaching."
      copy="Free registration. First placement commission-free. Three quick steps to join Delhi's tutor network."
      image={registerImg}
      imageAlt="Tutor completing a registration checklist for teaching opportunities"
    >
      <div>
        <TutorRegistrationWizard />
      </div>
    </SplitShell>
  );
}
