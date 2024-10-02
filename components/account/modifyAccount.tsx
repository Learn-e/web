"use client";

import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/authStore";
import { Skeleton } from "../ui/skeleton";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Auth } from "@/api/auth";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { FileUpload } from "../ui/file-upload";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";


export default function ModifyAccount() {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-row gap-16 w-full">
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

function ModifyAccountForm({ user }: { user: any }) {
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
      console.log("Email changed");
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-3.5"
        onSubmit={form.handleSubmit(onSubmit)}
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
        <Button className="mt-1" type="submit">
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
  return (
    <div className="w-full">
      <div>
        <Avatar className="w-64 h-64">
          <AvatarImage src={"http://localhost:3000/auth/profile-picture"} />
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
      <div className="flex flex-col gap-2 items-center mt-4">
        <ModifyProfilePicture />
        <Button className="w-full" variant={"destructive"}>Supprimer la photo de profil</Button>
      </div>
    </div>
  );
}

function ModifyProfilePicture () {
  const [file, setFile] = useState<File>();
  const AuthAPI = new Auth();

  function handleFileUpload (file: File) {
    setFile(file);
  }

  const uploadProfilePicture = useMutation({mutationKey: ["updateProfilePicture"], mutationFn: (file: any) => {
    const formData = new FormData();
    formData.append("picture", file);
    return AuthAPI.update_profile_picture({ file: formData});
  }});

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button className="w-full" variant={"default"}>Modifier la photo de profil</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Modifier la photo de profil</AlertDialogTitle>
        </AlertDialogHeader>
        <FileUpload onChange={handleFileUpload}/>
        <AlertDialogFooter>
          <AlertDialogCancel> Annuler </AlertDialogCancel>
          <AlertDialogAction onClick={() =>
            uploadProfilePicture.mutate(file)
          }> Confirmer </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
