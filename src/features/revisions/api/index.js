import { http } from "@/shared/config/http";

export const RevisionsApi = {
  list: () => http("/revisions?order=published_at.desc"),
  create: (payload) => http("/revisions", { method: "POST", body: JSON.stringify(payload) }),
};
