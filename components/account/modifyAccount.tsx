"use client";

import { Auth } from "@/api/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/store/authStore";
import { IUser } from "@/types/IUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FileUpload } from "../ui/file-upload";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

const AuthAPI = new Auth();

export default function ModifyAccount() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-row w-full gap-16 mt-6">
      <div className="mt-3">
        <ProfilePicture />
      </div>
      <div className="w-96">
        {user ? (
          <ModifyAccountForm user={user} />
        ) : (
          <ModifyAccountFormSkeleton />
        )}
      </div>
    </div>
  );
}

function ModifyAccountForm({ user }: { user: IUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const changeEmail = useMutation({
    mutationKey: ["changeEmail"],
    mutationFn: (email: string) => {
      return AuthAPI.change_email({ email });
    },
    onSuccess: () => {
      toast.success("Email mis à jour avec succès", {
        position: "top-center",
        duration: 1500,
      });
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'email", {
        position: "top-center",
        duration: 1500,
      });
    },
  });
  const changePassword = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: ({
      current_password,
      new_password,
    }: {
      current_password: string;
      new_password: string;
    }) => {
      return AuthAPI.change_password({ current_password, new_password });
    },
    onSuccess: () => {
      toast.success("Mot de passe mis à jour avec succès", {
        position: "top-center",
        duration: 1500,
      });
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du mot de passe", {
        position: "top-center",
        duration: 1500,
      });
    },
  });

  const modifyAccountSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    old_password: z.string(),
    new_password: z.string(),
    confirm_new_password: z.string(),
  });

  const form = useForm<z.infer<typeof modifyAccountSchema>>({
    resolver: zodResolver(modifyAccountSchema),
    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof modifyAccountSchema>) {
    if (values.email !== user.email) {
      changeEmail.mutate(values.email);
      user.email = values.email;
    }
    if (values.new_password !== "" && values.confirm_new_password !== "") {
      if (values.old_password === "") {
        return toast.error("Veuillez saisir votre ancien mot de passe", {
          position: "top-center",
          duration: 1500,
        });
      }
      if (values.new_password !== values.confirm_new_password) {
        return toast.error("Les mots de passe ne correspondent pas", {
          position: "top-center",
          duration: 1500,
        });
      }
      if (values.new_password === values.confirm_new_password) {
        changePassword.mutate({
          current_password: values.old_password,
          new_password: values.new_password,
        });
      }
    }
  }

  function isFormDisabled() {
    const values = form.getValues();
    const isPasswordChangeValid =
      values.old_password !== "" &&
      values.new_password !== "" &&
      values.confirm_new_password !== "";
    return values.email === user.email && !isPasswordChangeValid;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3.5"
        onSubmit={form.handleSubmit(onSubmit)}
        onChange={() => setIsEditing(!isFormDisabled())}
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input type="text" disabled placeholder="Prénom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type="text" disabled placeholder="Nom" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Ancien mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ancien mot de passe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirmer le nouveau mot de passe"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="mt-1"
          type="submit"
          variant={isEditing ? "default" : "outline"}
          disabled={!isEditing}
        >
          Modifier le compte
        </Button>
      </form>
    </Form>
  );
}

function ModifyAccountFormSkeleton() {
  return (
    <div className="flex flex-col gap-3.5">
      <div>
        <Label> Prénom </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <div>
        <Label> Nom </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <div>
        <Label> Email </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <div>
        <Label> Ancien mot de passe </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <div>
        <Label> Nouveau mot de passe </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <div>
        <Label> Confirmer le nouveau mot de passe </Label>
        <Skeleton className="h-10 mt-1" />
      </div>
      <Skeleton className="h-10 mt-1" />
    </div>
  );
}

function ProfilePicture() {
  const [avatarKey, setAvatarKey] = useState(0);
  const deletePicture = useMutation({
    mutationKey: ["deleteProfilePicture"],
    mutationFn: () => {
      return AuthAPI.delete_profile_picture();
    },
    onSuccess: () => {
      toast.success("Photo de profil supprimée avec succès", {
        position: "top-center",
        duration: 1500,
      });
      setAvatarKey((prev: number) => prev + 1);
    },
  });

  return (
    <div className="w-full">
      <div>
        <Avatar className="w-64 h-64">
          <AvatarImage
            src={`http://localhost:3000/auth/profile-picture?key=${avatarKey}`}
          />
          <AvatarFallback>
            <Image
              src="/placeholder_picture.png"
              alt="placeholder_picture"
              width={256}
              height={256}
            />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <ModifyProfilePicture
          onProfilePictureChange={() =>
            setAvatarKey((prev: number) => prev + 1)
          }
        />
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={() => deletePicture.mutate()}
        >
          Supprimer la photo de profil
        </Button>
      </div>
    </div>
  );
}

function ModifyProfilePicture({
  onProfilePictureChange,
}: {
  onProfilePictureChange: () => void;
}) {
  const [file, setFile] = useState<File | undefined>();

  function handleFileUpload(file: File) {
    setFile(file);
  }

  const uploadProfilePicture = useMutation({
    mutationKey: ["updateProfilePicture"],
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("picture", file);
      return AuthAPI.update_profile_picture({ file: formData });
    },
    onSuccess: () => {
      toast.success("Photo de profil mise à jour avec succès", {
        position: "top-center",
        duration: 1500,
      });
      onProfilePictureChange();
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de la photo de profil", {
        position: "top-center",
        duration: 1500,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant={"default"}>
          Modifier la photo de profil
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier la photo de profil</AlertDialogTitle>
        </AlertDialogHeader>
        <FileUpload onChange={handleFileUpload} />
        <AlertDialogFooter>
          <AlertDialogCancel> Annuler </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (file) {
                uploadProfilePicture.mutate(file);
              } else {
                toast.error("Veuillez sélectionner un fichier", {
                  position: "top-center",
                  duration: 1500,
                });
              }
            }}
            asChild
          >
            <Button>Confirmer</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
