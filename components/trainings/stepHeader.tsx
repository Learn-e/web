"use client";
import { Steps } from "@/api/steps";
import { useQuery } from "@tanstack/react-query";
import EditStepButton from "./editStepButton";
import DeleteStepButton from "./deleteStepButton";
import { Trainings } from "@/api/trainings";
import { useRouter } from "next/navigation";

export default function StepHeader({ id }: { id: string }) {
  const stepAPI = new Steps();
  const router = useRouter();
  const trainingAPI = new Trainings();
  const step: any = useQuery({
    queryKey: ["get_step"],
    queryFn: () => stepAPI.get_training_step(id),
  });
  console.log(id);
  const my_trainings: any = useQuery({
    queryKey: ["my_trainings"],
    queryFn: trainingAPI.get_my_trainings,
  });

  if (step.isLoading) {
    router.refresh();
    return null;
  }

  const training_id = window.location.pathname.split("/")[2];
  const isOwned = my_trainings.data?.some(
    (training: any) =>
      training.id.toString() === training_id.toString() && training.owner
  );

  return (
    <div>
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          {step.data?.title}
        </h1>
        {isOwned && (
          <>
            <EditStepButton step_id={step?.data.id} />
            <DeleteStepButton step_id={step?.data.id} />
          </>
        )}
      </div>
      <p className="leading-7 text-justify [&:not(:first-child)]:mt-2 text-muted-foreground">
        {step.data?.description}
      </p>
    </div>
  );
}
