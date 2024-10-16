import { api } from "./api";

export class Trainings {
  create_training = async ({
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

  create_training_step = async ({
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
    return await api.post(`trainings/${id}/steps`, {
      json: {
        title,
        description,
        content,
      },
    });
  };

  get_training_steps = async (id: string) => {
    return await api.get(`trainings/${id}/steps`).json();
  };
}
