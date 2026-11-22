import OneOnOneClasses from "./Home/OneOnOneClasses";

/**
 * /classes renders the same Personalised Learning section as the home
 * page — a single shared component, so the two can never drift apart.
 */
export default function ClassesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <main className="flex flex-1 flex-col">
        <OneOnOneClasses />
      </main>
    </div>
  );
}
