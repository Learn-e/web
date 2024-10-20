"use client";
import { Trainings } from "@/api/trainings";
import { IStep } from "@/types/IStep";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import CreateStep from "./createStep";

export default function TrainingTimeline({ id }: { id: string }) {
  const trainingsAPI = new Trainings();
  const steps: any = useQuery({
    queryKey: ["get_trainings_steps"],
    queryFn: () => trainingsAPI.get_training_steps(id),
  });

  if (steps.isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col items-end">
      <div>
        <CreateStep training_id={id} />
      </div>
      <div className="flex flex-col mt-4">
        {steps.data?.map((step: IStep) => (
          <div key={step.id} className="flex flex-col gap-16">
            <div className="flex items-center hover:text-gray-400">
              <Link
                href={`${id}/steps/${step.id}`}
                className="text-lg font-bold"
              >
                - <span>{step.title}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
