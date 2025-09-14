import { http } from "@/shared/config/http";

export const TranslationsApi = {
  list:   () => http("/translations?order=published_at.desc"),
  create: (payload) => http("/translations", { method: "POST", body: JSON.stringify(payload) }),
};
