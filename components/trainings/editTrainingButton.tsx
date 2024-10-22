"use client";

import { Edit } from "lucide-react";
import { Trainings } from "@/api/trainings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconsOptions, IconsOptionsType } from "@/data/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

function EditTrainingForm({
  training,
  setOpen,
}: {
  training: any;
  setOpen: any;
}) {
  const TrainingsAPI = new Trainings();
  const query = useQueryClient();
  const updateTraining = useMutation({
    mutationKey: ["update_training"],
    mutationFn: async ({
      title,
      description,
      icon,
    }: {
      title: string;
      description: string;
      icon: string;
    }) => {
      return TrainingsAPI.update_training({
        id: training.id,
        title: title,
        description: description,
        icon: icon,
      });
    },
    onSuccess: () => {
      toast.success("Votre formation a bien été mise à jour.", {
        position: "top-center",
        duration: 1500,
      });
      query.invalidateQueries({ queryKey: ["my_trainings"] });
      query.invalidateQueries({ queryKey: ["get_training"] });
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de la mise à jour de la formation.",
        {
          position: "top-center",
          duration: 1500,
        }
      );
    },
  });

  const editTrainingSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.any(),
  });

  const form = useForm<z.infer<typeof editTrainingSchema>>({
    resolver: zodResolver(editTrainingSchema),
    defaultValues: {
      title: training.title,
      description: training.description,
      icon: training.icon,
    },
  });

  function onSubmit(values: z.infer<typeof editTrainingSchema>) {
    updateTraining.mutate({
      title: values.title,
      description: values.description,
      icon: values.icon,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel> Titre </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Titre de la formation"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel> Description </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de la formation"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel> Icône </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une icône" />
                  </SelectTrigger>
                  <SelectContent>
                    {IconsOptions.map((option: IconsOptionsType) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          {option.selectIcon}
                          <span className="ml-4">{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button
            onClick={() => setOpen(false)}
            className="w-fit"
            variant={"outline"}
            type="button"
          >
            Annuler
          </Button>
          <Button className="w-fit" type="submit">
            Mettre à jour
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function EditTrainingButton({
  training_id,
}: {
  training_id: string;
}) {
  const [open, setOpen] = useState(false);
  const trainingAPI = new Trainings();
  const training = useQuery({
    queryKey: ["get_training"],
    queryFn: () => trainingAPI.get_training(training_id),
  });
  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await training.refetch();
    setOpen(true);
  };

  if (open) {
    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="p-1.5" variant={"ghost"}>
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier la formation</DialogTitle>
              <DialogDescription>
                Modifiez les détails de votre formation.
              </DialogDescription>
            </DialogHeader>
            <EditTrainingForm setOpen={setOpen} training={training.data} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Button onClick={handleClick} className="p-1.5" variant={"ghost"}>
      <Edit />
    </Button>
  );
}
