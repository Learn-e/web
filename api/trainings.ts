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

  get_my_trainings = async () => {
    return await api.get("trainings/subscribed").json();
  };

  get_trainings = async () => {
    return await api.get("trainings").json();
  };

  subscribe_to_training = async ({ training_id }: { training_id: string }) => {
    return await api.post(`trainings/${training_id}/subscribe`);
  };

  unsubscribe_to_training = async ({
    training_id,
  }: {
    training_id: string;
  }) => {
    return await api.delete(`trainings/${training_id}/unsubscribe`);
  };

  get_training = async (id: string) => {
    return await api.get(`trainings/${id}`).json();
  };

  get_training_steps = async (id: string) => {
    return await api.get(`trainings/${id}/steps`).json();
  };
}
