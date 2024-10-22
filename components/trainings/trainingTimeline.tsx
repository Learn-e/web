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
    retry: 0,
  });
  const my_trainings: any = useQuery({
    queryKey: ["my_trainings"],
    queryFn: trainingsAPI.get_my_trainings,
  });

  if (steps.isLoading) {
    return null;
  }

  function userOwnTraining() {
    return my_trainings.data?.some(
      (training: any) => training.id.toString() === id && training.owner
    );
  }

  function userSubscribedToTraining() {
    return my_trainings.data?.some(
      (training: any) => training.id.toString() === id
    );
  }

  const isOwner = userOwnTraining();
  const isSubscribed = userSubscribedToTraining();

  return (
    <div className="flex flex-col items-end">
      {isOwner && (
        <div>
          <CreateStep training_id={id} />
        </div>
      )}
      <div className="flex flex-col mt-4">
        {!isSubscribed ? (
          <p>Vous devez être inscrit à cette formation pour voir les étapes.</p>
        ) : steps.data?.length > 0 ? (
          steps.data?.map((step: IStep) => (
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
          ))
        ) : (
          <p className="text-muted-foreground">Aucune étape pour le moment</p>
        )}
      </div>
    </div>
  );
}
