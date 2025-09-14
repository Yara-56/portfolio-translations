import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useTabs(allTabs, defaultTab) {
  const [params, setParams] = useSearchParams();
  const current = params.get("tab");
  const initial = allTabs.includes(current) ? current : defaultTab;

  const [active, setActive] = useState(initial);
  useEffect(() => setActive(initial), [initial]);

  const setTab = (tab) => {
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    setParams(next, { replace: true });
    setActive(tab);
  };

  return { active, setTab };
}
