import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase.from("projects")
      .select("*")
      .eq("visibility", "public")
      .order("date", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setItems(data || []);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6 md:grid-cols-2">
      {items.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  );
}
