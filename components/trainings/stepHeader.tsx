"use client";
import { Steps } from "@/api/steps";
import { useQuery } from "@tanstack/react-query";
import EditStepButton from "./editStepButton";
import DeleteStepButton from "./deleteStepButton";

export default function StepHeader({ id }: { id: string }) {
  const stepAPI = new Steps();
  const step: any = useQuery({
    queryKey: ["get_step"],
    queryFn: () => stepAPI.get_training_step(id),
  });

  if (step.isLoading) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          {step.data?.title}
        </h1>
        <EditStepButton step_id={step?.data.id} />
        <DeleteStepButton step_id={step?.data.id} />
      </div>
      <p className="leading-7 text-justify [&:not(:first-child)]:mt-2 text-muted-foreground">
        {step.data?.description}
      </p>
    </div>
  );
}
