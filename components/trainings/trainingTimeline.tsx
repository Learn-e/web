"use client";
import { Trainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import CreateStep from "./createStep";

export default function TrainingTimeline({ id }: { id: string }) {
  const trainingsAPI = new Trainings();
  const steps: any = useQuery({
    queryKey: ["getTrainingSteps"],
    queryFn: () => trainingsAPI.get_training_steps(id),
  });

  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <CreateStep />
      </div>
    </div>
  );
}
