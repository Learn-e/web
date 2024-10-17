"use client";
import { Steps } from "@/api/steps";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StepBody({ id }: { id: string }) {
  const stepAPI = new Steps();
  const step: any = useQuery({
    queryKey: ["get_training_step"],
    queryFn: () => stepAPI.get_training_step(id),
  });

  return (
    <div className="w-full">
      <Markdown
        className={
          "max-w-none prose lg:prose-lg dark:prose-invert prose-h1:mb-1 prose-h2:m-0 prose-p:mb-5 prose-p:text-justify prose-p:mt-0 prose-hr:mb-6"
        }
        remarkPlugins={[remarkGfm]}
      >
        {step.data?.content}
      </Markdown>
      {step.data?.video && (
        <video
          className="mt-4"
          controls
          src={step.data?.video}
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}
