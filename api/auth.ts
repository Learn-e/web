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
}
