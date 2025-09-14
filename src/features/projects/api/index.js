import { http } from "@/shared/config/http";

export const ProjectsApi = {
  featured: () => http("/projects?limit=6&order=updated_at.desc"),
  list:     () => http("/projects?limit=20&order=updated_at.desc"),
  getBySlug: (slug) => http(`/projects/slug/${encodeURIComponent(slug)}`),

  // endpoints de admin (se usar nos Inline*Forms)
  create: (payload) => http("/projects", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => http(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  remove: (id) => http(`/projects/${id}`, { method: "DELETE" }),
};
