import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck2,
  FileText,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.12),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(99,102,241,0.08),_transparent_30%)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={16} />
              AI-Powered Resume Builder
            </div>

            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-gray-950 sm:text-6xl">
              Build a Resume That{" "}
              <span className="text-blue-600">Gets Noticed.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Create professional, ATS-friendly resumes with AI assistance.
              Write better content, showcase your skills, and stand out from
              the competition.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Create My Resume
                <ArrowRight size={18} />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                ATS-friendly structure
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                AI assistance
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                Professional design
              </div>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-blue-100/60 blur-3xl" />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/70 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Resume Preview
                    </p>
                    <p className="text-xs text-gray-500">
                      ATS-friendly format
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                  Ready
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div className="border-b border-gray-200 pb-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Nikhil Gupta
                  </h2>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    Frontend Developer
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    Lucknow, India · nikhil@example.com
                  </p>
                </div>

                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-gray-900">
                      SUMMARY
                    </h3>

                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-11/12 rounded bg-gray-200" />
                      <div className="h-2 w-4/5 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-gray-900">
                      EXPERIENCE
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      Frontend Developer
                    </p>

                    <div className="mt-2 space-y-1.5">
                      <div className="h-2 w-full rounded bg-gray-200" />
                      <div className="h-2 w-10/12 rounded bg-gray-200" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-gray-900">
                      SKILLS
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Next.js", "JavaScript", "Node.js"].map(
                        (skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI Card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <WandSparkles size={18} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    AI Assistant
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Content improved ✨
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Build a better resume, faster
            </h2>

            <p className="mt-4 text-gray-600">
              Everything you need to create a professional resume without
              struggling with formatting or what to write.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Bot size={24} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                AI-Powered Writing
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Generate summaries, skills, project descriptions and
                experience content with AI assistance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <FileCheck2 size={24} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                ATS-Friendly
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Keep your resume clean, structured and easy for Applicant
                Tracking Systems to parse.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-gray-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FileText size={24} />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Professional Design
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Create clean and professional resumes that recruiters can
                quickly scan and understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="bg-gray-50 px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <WandSparkles size={24} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              AI Assistance
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Don't know what to write?
              <span className="block text-blue-600">
                Let AI help you.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-gray-600">
              Turn simple information about your work into professional
              resume content. Improve your existing content and make your
              experience stand out.
            </p>

            <Link
              href="/auth/register"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-800"
            >
              Start Building
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* AI Demo */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900">
                Experience Description
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-600">
                <Sparkles size={13} />
                AI
              </span>
            </div>

            <div className="rounded-xl bg-gray-50 p-5">
              <p className="text-sm leading-7 text-gray-600">
                Developed web applications using React and JavaScript.
              </p>
            </div>

            <div className="my-5 flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                ↓
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles size={15} className="text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">
                  AI Improved Content
                </span>
              </div>

              <p className="text-sm leading-7 text-gray-700">
                Developed and optimized responsive web applications using
                React and modern JavaScript technologies, delivering
                scalable and user-focused digital experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Simple process
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Build your resume in 3 steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Create Your Resume",
                description:
                  "Start with a clean, professional resume structure.",
              },
              {
                number: "02",
                title: "Add Your Details",
                description:
                  "Add your experience, projects, education and skills.",
              },
              {
                number: "03",
                title: "Improve with AI",
                description:
                  "Use AI to generate and improve your resume content.",
              },
            ].map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gray-950 px-6 py-16 text-center sm:px-12">
          <div className="mx-auto max-w-2xl">
            <Sparkles className="mx-auto h-8 w-8 text-blue-400" />

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to build your resume?
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Create a professional, ATS-friendly resume and take the next
              step toward your career goals.
            </p>

            <Link
              href="/auth/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-100"
            >
              Create Free Resume
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-500 sm:flex-row">
          <p>© 2026 ATS Resume Builder. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:text-gray-900">
              Login
            </Link>

            <Link href="/auth/register" className="hover:text-gray-900">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}