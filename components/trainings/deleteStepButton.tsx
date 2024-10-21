import { Steps } from "@/api/steps";
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
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteStepButton({ step_id }: { step_id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const query = useQueryClient();
  const stepsAPI = new Steps();
  const deleteStep = useMutation({
    mutationKey: ["delete_step"],
    mutationFn: async () => {
      return stepsAPI.delete_step(step_id);
    },
    onSuccess: () => {
      toast.success("Étape supprimée avec succès", {
        duration: 1500,
        position: "top-center",
      });
      query.invalidateQueries({ queryKey: ["get_step"] });
    },
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirm = () => {
    deleteStep.mutate();
    setOpen(false);
    router.refresh();
    router.back();
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
                Êtes-vous sûr de vouloir supprimer cette étape ? Cette action
                est irréversible.
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
