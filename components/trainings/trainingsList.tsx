"use client";

import { Trainings } from "@/api/trainings";
import { useQuery } from "@tanstack/react-query";
import TrainingCard from "./trainingCard";
import { Key } from "react";

function getSubscribedTrainingsIds({
  myTrainings,
  trainings,
}: {
  myTrainings: any;
  trainings: any;
}) {
  const myTrainingsIds = new Set(
    myTrainings?.data?.map((training: any) => training.id),
  );
  const filteredTrainings = trainings?.data?.filter(
    (training: any) => !myTrainingsIds.has(training.id),
  );

  return filteredTrainings;
}

export default function TrainingsList() {
  const trainingsAPI = new Trainings();
  const trainings: any = useQuery({
    queryKey: ["get_trainings"],
    queryFn: trainingsAPI.get_trainings,
  });
  const myTrainings: any = useQuery({
    queryKey: ["my_trainings"],
    queryFn: trainingsAPI.get_my_trainings,
  });

  const filteredTrainings = getSubscribedTrainingsIds({
    myTrainings,
    trainings,
  });

  if (trainings.isLoading || filteredTrainings.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="scroll-m-20 underline text-3xl font-extrabold tracking-tight lg:text-4xl">
        Découvrir plus de formations
      </h1>
      <div className="flex flex-row flex-wrap gap-3">
        {filteredTrainings.map((training: any, key: Key) => (
          <TrainingCard key={key} training={training} />
        ))}
      </div>
    </div>
  );
}
