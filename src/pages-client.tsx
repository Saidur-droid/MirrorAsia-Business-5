import React from "react";
import { createRoot } from "react-dom/client";
import Landing from "./app/landing";
import Studio from "./app/page";

function App() {
  const [pathname, setPathname] = React.useState(window.location.pathname);
  React.useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    const onClick = (event: MouseEvent) => {
      const a = (event.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || a.target || a.hasAttribute("download")) return;
      const to = new URL(a.href);
      if (to.origin !== window.location.origin || !["/", "/studio"].includes(to.pathname)) return;
      if (to.pathname !== window.location.pathname) {
        event.preventDefault(); window.history.pushState({}, "", to.pathname); setPathname(to.pathname);window.scrollTo(0,0);
      }
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("popstate", onPop);document.removeEventListener("click", onClick); };
  }, []);
  return pathname === "/studio" ? <Studio /> : <Landing />;
}
const root = document.getElementById("root");
if (!root) throw new Error("Missing root container");
createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
