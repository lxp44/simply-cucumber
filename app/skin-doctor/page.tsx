// app/skin-doctor/page.tsx
import SkinDoctorQuiz from "../../components/SkinDoctorQuiz";

export const metadata = {
  title: "Skin Doctor | Simply Cucumber",
  description:
    "Answer a few quick questions and get a personalized routine with Simply Cucumber products.",
};

export default function SkinDoctorPage() {
  return (
    <section className="min-h-screen bg-[#e3d3b3]">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-[var(--font-playfair)] text-cucumber-800">
            Skin Doctor
          </h1>
          <p className="mt-2 text-gray-700">
            Tell us about your skin. We’ll build a routine in under a minute.
          </p>
        </header>

        <SkinDoctorQuiz />
      </div>
    </section>
  );
}