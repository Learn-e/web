import { api } from "./api";

export class Trainings {
  createTraining = async ({
    title,
    description,
    icon,
  }: {
    title: string;
    description: string;
    icon: string;
  }) => {
    return await api.post("trainings", {
      json: {
        title,
        description,
        icon,
      },
    });
  };

  getTrainings = async () => {
    return await api.get("trainings").json();
  };
}
