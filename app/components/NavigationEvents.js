"use client";

import { useEffect, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { VideoLoadedContext } from "@/utils/VideoLoadedContext";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setIsVideoLoaded } = useContext(VideoLoadedContext);

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // console.log(url);

    // TODO: check if this is the first time loaded
    if (pathname !== "/") {
      setIsVideoLoaded(false);
    }
  }, [pathname, searchParams]);

  return null;
}
