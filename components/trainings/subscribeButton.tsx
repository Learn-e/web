import { Trainings } from "@/api/trainings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import EditTrainingButton from "./editTrainingButton";
import DeleteTrainingButton from "./deleteTrainingButton";
import { useRouter } from "next/navigation";

function userOwnTraining({
  my_trainings,
  training_id,
}: {
  my_trainings: any;
  training_id: string;
}): boolean {
  return my_trainings.data?.some(
    (training: any) =>
      training.id.toString() === training_id.toString() && training.owner
  );
}

function userSubscribedToTraining({
  my_trainings,
  training_id,
}: {
  my_trainings: any;
  training_id: string;
}): boolean {
  return my_trainings.data?.some(
    (training: any) => training.id.toString() === training_id.toString()
  );
}

export default function SubscribeButton({
  training_id,
}: {
  training_id: string;
}) {
  const TrainingAPI = new Trainings();
  const query = useQueryClient();
  const router = useRouter();
  const my_trainings = useQuery({
    queryKey: ["my_trainings"],
    queryFn: TrainingAPI.get_my_trainings,
  });
  const subscribe = useMutation({
    mutationKey: ["subscribe"],
    mutationFn: () => {
      return TrainingAPI.subscribe_to_training({ training_id });
    },
    onSuccess: () => {
      toast.success("Vous êtes maintenant inscrit à cette formation !", {
        duration: 1500,
        position: "top-center",
      });
      query.invalidateQueries({ queryKey: ["my_trainings"] });
      router.push(`/trainings/${training_id}`);
    },
    onError: () => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard", {
        duration: 1500,
        position: "top-center",
      });
    },
  });

  const unsubscribe = useMutation({
    mutationKey: ["unsubscribe"],
    mutationFn: () => {
      return TrainingAPI.unsubscribe_to_training({ training_id });
    },
    onSuccess: () => {
      toast.success("Vous êtes désormais désinscrit de cette formation !", {
        duration: 1500,
        position: "top-center",
      });
      query.invalidateQueries({ queryKey: ["my_trainings"] });
      router.push("/trainings");
    },
    onError: () => {
      toast.error("Une erreur est survenue, veuillez réessayer plus tard", {
        duration: 1500,
        position: "top-center",
      });
    },
  });

  const isOwned = userOwnTraining({ my_trainings, training_id });
  const isSubscribed = userSubscribedToTraining({ my_trainings, training_id });

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (isSubscribed) {
      unsubscribe.mutate();
    } else {
      subscribe.mutate();
    }
  }

  return (
    <>
      {!isOwned ? (
        <span
          className="z-50 hover:bg-accent p-1.5 rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          {isSubscribed ? <Check /> : <Plus />}
        </span>
      ) : (
        <div className="flex flex-row">
          <EditTrainingButton training_id={training_id} />
          <DeleteTrainingButton training_id={training_id} />
        </div>
      )}
    </>
  );
}
