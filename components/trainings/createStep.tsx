import { Steps } from "@/api/steps";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useRouter } from "next/navigation";

export default function CreateStep({ training_id }: { training_id: string }) {
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
        <CreateStepForm training_id={training_id} />
      </DialogContent>
    </Dialog>
  );
}

function CreateStepForm({ training_id }: { training_id: string }) {
  const [file, setFile] = useState<File | undefined>();
  const query = useQueryClient();
  const router = useRouter();
  const TrainingAPI = new Trainings();
  const StepAPI = new Steps();

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
      const result: any = await TrainingAPI.create_training_step({
        id: training_id,
        title,
        description,
        content,
      });
      return result;
    },
    onSuccess: () => {
      toast.success("L'étape a été créée avec succès !", {
        position: "top-center",
        duration: 1500,
      });
      query.invalidateQueries({ queryKey: ["get_trainings_steps"] });
    },
    onError: () => {
      toast.error("Une erreur s'est produite lors de la création de l'étape.");
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
      router.refresh();
    },
    onError: () => {
      toast.error("Une erreur s'est produite lors de l'ajout de la vidéo.", {
        position: "top-center",
        duration: 1500,
      });
    },
  });

  const createStepSchema = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    video: z.any(),
  });

  const form = useForm<z.infer<typeof createStepSchema>>({
    resolver: zodResolver(createStepSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  function handleFileUpload(file: File) {
    setFile(file);
  }

  async function onSubmit(values: z.infer<typeof createStepSchema>) {
    try {
      const result = await createStep.mutateAsync({
        title: values.title,
        description: values.description,
        content: values.content,
      });

      if (file && result.id) {
        const formData = new FormData();
        formData.append("source", file);
        await addVideo.mutateAsync({ id: result.id, source: formData });
      }
      form.reset();
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de l'étape.", {
        position: "top-center",
        duration: 1500,
      });
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
          <DialogClose asChild>
            <Button type="submit">Créer</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
