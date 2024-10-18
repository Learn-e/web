import ky from "ky";

export const api = ky.create({
  prefixUrl:
    process.env.NEXT_PUBLIC_API_URL || `${window.location.origin}:3000`,
  timeout: 10000,
  credentials: "include",
});
