import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trainings } from "@/api/trainings";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";

export default function DeleteTrainingButton({
  training_id,
}: {
  training_id: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const query = useQueryClient();
  const trainingsAPI = new Trainings();
  const deleteTraining = useMutation({
    mutationKey: ["delete_training"],
    mutationFn: async () => {
      return trainingsAPI.delete_training({ id: training_id });
    },
    onSuccess: () => {
      toast.success("Formation supprimée avec succès", {
        duration: 1500,
        position: "top-center",
      });
      query.invalidateQueries({ queryKey: ["my_trainings"] });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirm = () => {
    deleteTraining.mutate();
    setOpen(false);
    if (window.location.pathname.includes(training_id)) {
      router.push("/trainings");
    }
  };

  if (open) {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button onClick={handleClick} className="p-1.5" variant={"ghost"}>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette formation ? Cette
                action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction asChild onClick={handleConfirm}>
                <Button variant={"destructive"}>Supprimer</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <Button onClick={handleClick} className="p-1.5" variant={"ghost"}>
      <Trash />
    </Button>
  );
}
