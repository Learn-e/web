import { api } from "./api";

export class Steps {
  get_training_step = async (id: string) => {
    return await api.get(`steps/${id}`).json();
  };

  add_video_step = async ({ id, source }: { id: string; source: string }) => {
    alert(source);
    console.log(source);
    return await api.post(`steps/${id}/video`, {
      json: {
        body: source,
      },
    });
  };
}
