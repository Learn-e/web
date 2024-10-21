"use client";
import { Steps } from "@/api/steps";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StepBody({ id }: { id: string }) {
  const stepAPI = new Steps();
  const step: any = useQuery({
    queryKey: ["get_step"],
    queryFn: () => stepAPI.get_training_step(id),
  });

  console.log(step.data?.id);

  return (
    <div className="w-full">
      {step.data?.video && (
        <video
          className="w-full rounded-lg"
          controls
          src={`http://localhost:3000/steps/1/video`}
        />
      )}
      <Markdown
        className={
          "max-w-none mt-6 prose lg:prose-lg dark:prose-invert prose-h1:mb-1 prose-h2:m-0 prose-p:mb-5 prose-p:text-justify prose-p:mt-0 prose-hr:mb-6"
        }
        remarkPlugins={[remarkGfm]}
      >
        {step.data?.content}
      </Markdown>
    </div>
  );
}
