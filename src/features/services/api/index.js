import { http } from "@/shared/config/http";

export const ServicesApi = {
  list: () => http("/services?order=published_at.desc"),
  create: (payload) => http("/services", { method: "POST", body: JSON.stringify(payload) }),
};
