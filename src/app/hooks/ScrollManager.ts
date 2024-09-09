"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
// import { usePathname, useSearchParams } from "next/navigation";

// Argunebt is needed for tests
let counter = 0;

export const restoreScrollPosition = (pathName: string) => {
  window.scrollTo(0, 0);
  if (typeof window !== "undefined") {
      const state = history.state as { scrollPosition?: number, pathname?: string };
      if (state?.pathname == pathName && state?.scrollPosition !== undefined) {
        const currentHeight = document.body.scrollHeight;
        if (currentHeight >= state?.scrollPosition) {
          window.scrollTo(0, state?.scrollPosition);
        }
      }
    }
};

export const savePageHeightToHistory = function () {
  if (typeof window !== "undefined") {
    const pageHeight = document.documentElement.scrollHeight;
    const state = { ...history.state, pageHeight };
    history.replaceState(state, "");
  }
};

export const restorePageHeightFromHistory = function (pageName: string = "") {
  cleanUp();
  if (
    typeof window !== "undefined" &&
    history.state &&
    history.state.pageHeight
  ) {
    document.documentElement.style.minHeight = `${history.state.pageHeight}px`;
    console.log(
      counter,
      "Restored page height:",
      pageName,
      history.state.pageHeight
    );
  } 
};

export const cleanUp = function () {
  document.documentElement.style.minHeight = "";
};

// Хук для сохранения положения скролла
export const useScrollManager = () => {
  const pathname = usePathname();
  counter++;

  useEffect(() => {
    const saveScrollPosition = () => {
      if (typeof window !== "undefined") {
        const scrollPosition = window.scrollY;
        const currentHeight = document.body.scrollHeight;
        // Сохраняем положение скролла и высоту документа в history.state
        if (
          scrollPosition < currentHeight - window.innerHeight - 30 &&
          scrollPosition != 0 && pathname == history?.state?.pathname
        ) {
          const state = { ...history.state, scrollPosition };
          history.replaceState(state, "");
        }
      }
    };

    const state = { ...history.state, pathname };
    history.replaceState(state, "");
    window.removeEventListener("scroll", saveScrollPosition);
    window.addEventListener("scroll", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
    };
  }, [pathname]);
};
