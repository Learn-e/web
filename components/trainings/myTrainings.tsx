"use client";
import { Trainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import { Key } from "react";
import TrainingCard from "./trainingCard";

export default function MyTrainings() {
  const TrainingAPI = new Trainings();

  const my_trainings: any = useQuery({
    queryKey: ["my_trainings"],
    queryFn: TrainingAPI.get_my_trainings,
  });

  if (my_trainings.isLoading || my_trainings.data.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="scroll-m-20 underline text-3xl font-extrabold tracking-tight lg:text-4xl">
          Mes formations
        </h1>
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        {my_trainings.data?.map((training: any, key: Key) => (
          <TrainingCard key={key} training={training} />
        ))}
      </div>
    </div>
  );
}
