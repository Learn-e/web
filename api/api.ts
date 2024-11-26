import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://learne-api.slimourlissene.fr",
  timeout: 10000,
  credentials: "include",
});
