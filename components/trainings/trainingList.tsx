"use client";

import { Trainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import TrainingCard from "./trainingCard";
import { Key } from "react";

export default function TrainingList() {
  const trainingsAPI = new Trainings();
  const trainings: any = useQuery({
    queryKey: ["getTrainings"],
    queryFn: trainingsAPI.getTrainings,
  });

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {trainings.data?.map((training: any, key: Key) => (
        <TrainingCard key={key} training={training} />
      ))}
    </div>
  );
}
