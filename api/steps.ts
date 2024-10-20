import { api } from "./api";

export class Steps {
  get_step = async (id: string) => {
    return await api.get(`steps/${id}`).json();
  };

  update_step = async ({
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
    return await api.patch(`steps/${id}`, {
      json: {
        title,
        description,
        content,
      },
    });
  };

  delete_step = async (id: string) => {
    return await api.delete(`steps/${id}`);
  };

  get_training_step = async (id: string) => {
    return await api.get(`steps/${id}`).json();
  };

  add_video_step = async ({ id, source }: { id: string; source: FormData }) => {
    return await api.post(`steps/${id}/video`, {
      body: source,
    });
  };

  delete_video_step = async (id: string) => {
    return await api.delete(`steps/${id}/video`);
  };
}
