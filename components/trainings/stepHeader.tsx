"use client";
import { Steps } from "@/api/steps";
import { useQuery } from "@tanstack/react-query";

export default function StepHeader({ id }: { id: string }) {
  const stepAPI = new Steps();
  const step: any = useQuery({
    queryKey: ["get_training_step"],
    queryFn: () => stepAPI.get_training_step(id),
  });

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
        {step.data?.title}
      </h1>
      <p className="leading-7 text-justify [&:not(:first-child)]:mt-2 text-muted-foreground">
        {step.data?.description}
      </p>
    </div>
  );
}
