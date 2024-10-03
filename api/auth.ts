import { api } from "./api";

export class Auth {
  identity: any = async () => {
    return await api.get("auth");
  };

  login: any = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return await api.post("auth/login", {
      json: {
        email,
        password,
      },
    });
  };

  register = async ({
    email,
    username,
    password,
    firstname,
    lastname,
  }: {
    email: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    return await api.post("auth/register", {
      json: {
        email,
        username,
        password,
        firstname,
        lastname,
      },
    });
  };

  change_email = async ({ email }: { email: string }) => {
    console.log(email);
    return await api.patch("auth/change-email", {
      json: {
        new_email: email,
      },
    });
  };

  change_password = async ({
    current_password,
    new_password,
  }: {
    current_password: string;
    new_password: string;
  }) => {
    return await api.patch("auth/change-password", {
      json: {
        current_password,
        new_password,
      },
    });
  };

  update_profile_picture = async ({ file }: { file: any }) => {
    return await api.post("auth/profile-picture", {
      body: file,
    });
  };

  delete_profile_picture = async () => {
    return await api.delete("auth/profile-picture");
  };
}
