"use client";

import { createContext, useState } from "react";

export const VideoLoadedContext = createContext(null);

export function VideoLoadedProvider(props) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <>
      <VideoLoadedContext.Provider value={{ isVideoLoaded, setIsVideoLoaded }}>
        {props.children}
      </VideoLoadedContext.Provider>
    </>
  );
}
