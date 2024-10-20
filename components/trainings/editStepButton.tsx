"use client";

import { Edit } from "lucide-react";
import { Steps } from "@/api/steps";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { VideoUpload } from "../ui/video-upload";
import { IStep } from "@/types/IStep";

function EditStepForm({ step, setOpen }: { step: IStep; setOpen: any }) {
  const [file, setFile] = useState<File | undefined>();
  const query = useQueryClient();
  const StepAPI = new Steps();

  const updateStep = useMutation({
    mutationKey: ["update_step"],
    mutationFn: async ({
      id,
      title,
      description,
      content,
    }: {
      id: string;
      title: string;
      description: string;
      content: string;
    }) => {
      return await StepAPI.update_step({
        id,
        title,
        description,
        content,
      });
    },
    onSuccess: () => {
      toast.success("L'étape a été mise à jour avec succès !", {
        position: "top-center",
        duration: 1500,
      });
      query.invalidateQueries({ queryKey: ["get_step"] });
    },
    onError: () => {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de l'étape.",
      );
    },
  });

  const addVideo = useMutation({
    mutationKey: ["add_video"],
    mutationFn: async ({ id, source }: { id: string; source: FormData }) => {
      return await StepAPI.add_video_step({ id, source });
    },
    onSuccess: () => {
      toast.success("La vidéo a été ajoutée avec succès !", {
        position: "top-center",
        duration: 1500,
      });
      query.invalidateQueries({ queryKey: ["get_step"] });
    },
    onError: () => {
      toast.error("Une erreur s'est produite lors de l'ajout de la vidéo.", {
        position: "top-center",
        duration: 1500,
      });
    },
  });

  const deleteVideo = useMutation({
    mutationKey: ["delete_video"],
    mutationFn: async (id: string) => {
      return await StepAPI.delete_video_step(id);
    },
    onError: () => {
      toast.error(
        "Une erreur s'est produite lors de la suppression de la vidéo.",
        {
          position: "top-center",
          duration: 1500,
        },
      );
    },
  });

  const editStepSchema = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    video: z.any(),
  });

  const form = useForm<z.infer<typeof editStepSchema>>({
    resolver: zodResolver(editStepSchema),
    defaultValues: {
      title: step.title || "",
      description: step.description || "",
      content: step.content || "",
    },
  });

  function handleFileUpload(file: File) {
    setFile(file);
  }

  async function onSubmit(values: z.infer<typeof editStepSchema>) {
    try {
      await updateStep.mutateAsync({
        id: step.id,
        title: values.title,
        description: values.description,
        content: values.content,
      });

      if (file) {
        const formData = new FormData();
        formData.append("source", file);
        await deleteVideo.mutateAsync(step.id);
        await addVideo.mutateAsync({ id: step.id, source: formData });
      }
      form.reset();
      setOpen(false);
    } catch {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour de l'étape.",
        {
          position: "top-center",
          duration: 1500,
        },
      );
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
              <FormLabel>Titre de l&apos;étape</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  required
                  placeholder="Entrez le titre de l'étape"
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
              <FormLabel>Description de l&apos;étape</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Entrez la description de l'étape"
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
              <FormLabel>Contenu de l&apos;étape</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="Entrez le contenu de l'étape"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Vous pouvez utiliser du Markdown pour formater votre contenu.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Support vidéo</FormLabel>
          <FormControl>
            <VideoUpload onChange={handleFileUpload} />
          </FormControl>
        </FormItem>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant={"outline"}>Annuler</Button>
          </DialogClose>
          <Button type="submit">Mettre à jour</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default function EditStepButton({ step_id }: { step_id: string }) {
  const [open, setOpen] = useState(false);
  const StepAPI = new Steps();
  const step = useQuery({
    queryKey: ["get_step"],
    queryFn: async () => {
      return await StepAPI.get_step(step_id);
    },
  });
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
              <DialogTitle>Modifier l'étape</DialogTitle>
              <DialogDescription>
                Modifiez les détails de votre étape.
              </DialogDescription>
            </DialogHeader>
            <EditStepForm setOpen={setOpen} step={step.data as IStep} />
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
