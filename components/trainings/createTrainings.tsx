"use client";

import { Trainings } from "@/api/trainings";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconsOptions, IconsOptionsType } from "@/data/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export default function CreateTrainings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-fit">
          Créer une formation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une formation</DialogTitle>
          <DialogDescription>
            Créez une formation pour transmettre vos connaissances au monde
            entier.
          </DialogDescription>
        </DialogHeader>
        <CreateTrainingForm />
      </DialogContent>
    </Dialog>
  );
}

function CreateTrainingForm() {
  const TrainingsAPI = new Trainings();
  const query = useQueryClient();
  const createTraining = useMutation({
    mutationKey: ["create_training"],
    mutationFn: async ({
      title,
      description,
      icon,
    }: {
      title: string;
      description: string;
      icon: string;
    }) => {
      return TrainingsAPI.create_training({
        title: title,
        description: description,
        icon: icon,
      });
    },
    onSuccess: () => {
      toast.success("Votre formation a bien été créée.", {
        position: "top-center",
        duration: 1500,
      });
      query.invalidateQueries({ queryKey: ["my_trainings"] });
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de la création de la formation.",
        {
          position: "top-center",
          duration: 1500,
        },
      );
    },
  });

  const createTrainingSchema = z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  });

  const form = useForm<z.infer<typeof createTrainingSchema>>({
    resolver: zodResolver(createTrainingSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  function onSubmit(values: z.infer<typeof createTrainingSchema>) {
    createTraining.mutate({
      title: values.title,
      description: values.description,
      icon: values.icon,
    });
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
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-fit" variant={"outline"} type="button">
              Annuler
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-fit" type="submit">
              Créer une formation
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
