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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function CreateStep({ id }: { id: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer une nouvelle étape</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une étape</DialogTitle>
          <DialogDescription>
            Créez une nouvelle étape pour votre formation.
          </DialogDescription>
        </DialogHeader>
        <CreateStepForm id={id} />
      </DialogContent>
    </Dialog>
  );
}

function CreateStepForm({ id }: { id: string }) {
  const TrainingAPI = new Trainings();
  const createStep = useMutation({
    mutationKey: ["createStep"],
    mutationFn: async ({
      title,
      description,
      content,
    }: {
      title: string;
      description: string;
      content: string;
    }) => {
      return TrainingAPI.create_training_step({
        id,
        title,
        description,
        content,
      });
    },
  });
  const createStepSchema = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    video: z.string().optional(),
  });

  const form = useForm<z.infer<typeof createStepSchema>>({
    resolver: zodResolver(createStepSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      video: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createStepSchema>) {
    try {
      await createStep.mutate({
        title: values.title,
        description: values.description,
        content: values.content,
      });
      form.reset();
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de l'étape.");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de la formation</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  placeholder="Entrez le titre de la formation"
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
            <FormItem>
              <FormLabel>Description de la formation</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Entrez la description de la formation"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu de la formation</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Entrez le contenu de la formation"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien de la vidéo</FormLabel>
              <FormControl>
                <Input type="file" accept="video/*" multiple {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button type="submit">Créer</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
