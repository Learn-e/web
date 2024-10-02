"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trainings } from "@/api/trainings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import React from "react";
import { IconsOptionsType, IconsOptions } from "@/data/icons";

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
  const queryClient = useQueryClient();
  const createTraining = useMutation({
    mutationKey: ["createTraining"],
    mutationFn: async ({
      title,
      description,
      icon,
    }: {
      title: string;
      description: string;
      icon: string;
    }) => {
      TrainingsAPI.createTraining({
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
      queryClient.invalidateQueries({ queryKey: ["getTrainings"] });
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
