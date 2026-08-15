import ResumeBuilder from "@/components/resume/ResumeBuilder";
import Protected from "@/components/Protected";

interface ResumePageProps {
  params: Promise<{
    resumeId: string;
  }>;
}

export default async function ResumePage({
  params,
}: ResumePageProps) {
  const { resumeId } = await params;

  return (
    <Protected>
      <ResumeBuilder resumeId={resumeId} />
    </Protected>
  );
}