'use client'

import { useEffect, useState } from "react";


export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(
    () => {
      const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        const handler = event => setMatches(event.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    },
    []
  );
  return matches;
}

export function useBreakpoint() {
  const breakpoints = {
    isMobile: useMediaQuery("(max-width: 768px)"),
    //isSm: useMediaQuery("(min-width 641px) and (max-width: 768px)"),
    isTablet: useMediaQuery("(min-width: 769px) and (max-width: 1024px)"),
    isDesktop: useMediaQuery("(min-width: 1025px)")
  };

  return breakpoints;
}