"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function RouteStyling() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const path = pathname.replace(/\/$/, "") || "/";
    const chapterMatch = path.match(/^\/(?:jude)\/(\d+)$/);

    const resetReaderViewport = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      html.scrollTop = 0;
      body.scrollTop = 0;
    };

    html.classList.add("dark");
    html.style.colorScheme = "dark";
    body.classList.add("mbe-shell-managed");
    body.removeAttribute("data-jude-chapter");

    if (path === "/") body.dataset.judeRoute = "home";
    else if (path === "/background") body.dataset.judeRoute = "introduction";
    else if (chapterMatch) {
      body.dataset.judeRoute = "commentary";
      body.dataset.judeChapter = chapterMatch[1];
      resetReaderViewport();
    } else body.removeAttribute("data-jude-route");
  }, [pathname]);

  return null;
}
