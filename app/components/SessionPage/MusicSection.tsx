"use client";

import Image from "next/image";
import { albumsData } from "@/data/musicData";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import LoadingAnim from "./LoadingAnim";

export default function MusicSection({ epNum }: { epNum: number }) {
  const music = albumsData.filter((song) => song.episodes?.includes(epNum));
  // console.log(music);

  // use w music array to determine selected/current song
  const [songIndex, setSongIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isPausedBeforeLoad, setIsPausedBeforeLoad] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [isInit, setIsInit] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // TODO: loop playlist toggle
  // TODO: volume control ?
  // FIXME: create error message when archive.org is under maintenance (check notes for error code)
  // TODO: need to create a definite way to suspend/stop loading a song for cases like above

  // general audio settings
  if (audioRef.current != null) {
    audioRef.current.onloadstart = (e: ChangeEvent<HTMLInputElement>) => {
      console.log("load start");
      setIsLoading(true);
      setCanPlay(false);
      handleReset();
    };
    audioRef.current.onloadeddata = (e: ChangeEvent<HTMLInputElement>) => {
      console.log("data loaded");
      setIsLoading(false);
      setCanPlay(true);
    };
    audioRef.current.oncanplay = (e: ChangeEvent<HTMLInputElement>) => {
      console.log("can play/start");
      setCanPlay(true);
      // if paused before init load complete, pause; else play
      if (isPausedBeforeLoad) {
        handlePause();
      } else {
        handlePlay();
      }
      // handlePlay();
      // audioRef.current.play();
      // setIsPlaying(true);
    };

    // songs continue like a playlist
    handleContinuousPlay();
  }

  // seek to specific time in audio
  function handleSeek(e: ChangeEvent<HTMLInputElement>) {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  // update current time and duration
  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  }

  // handle reset
  function handleReset() {
    setCurrentTime(0);
    if (!canPlay) {
      setDuration(NaN);
    } else {
      setDuration(audioRef.current.duration);
    }
  }

  // handle stopped playlist ; temp unused (?)
  function handleStoppedPlaylist() {
    // handleReset();

    if (audioRef.current.play() !== undefined) {
      audioRef.current
        .play()
        .then((_) => {
          audioRef.current.pause();
          setIsPlaying(false);
          // handlePause();
          handleReset();
          console.log("paused to stop");
        })
        .catch((error: unknown) => {
          console.log("error: previous play was interrupted");
        });
    }
  }

  // handles playing the audio
  function handlePlay() {
    setIsInit(false);

    if (isLoading) {
      audioRef.current
        .play()
        .then((_) => {
          audioRef.current.play();
          setIsPlaying(true);
          setIsPausedBeforeLoad(false);
          console.log("playing selected song");
        })
        .catch((error: unknown) => {
          console.log(
            "Error: Previous song was interrupted; Loading selected song.",
          );
        });
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setIsPausedBeforeLoad(false);
    }
  }

  // handles pausing the audio
  function handlePause() {
    // audioRef.current.pause();
    // setIsPlaying(false);

    if (audioRef.current.play() !== undefined) {
      audioRef.current
        .play()
        .then((_) => {
          audioRef.current.pause();
          setIsPlaying(false);
          console.log("safely paused");
        })
        .catch((error: unknown) => {
          console.log("error: play was interruped");
        });
    }
  }

  // toggles play pause button
  function handlePlayPause() {
    // if audio is taking a while to load you can pause it before it starts playing
    if (isLoading && isPlaying) {
      setIsPausedBeforeLoad(true);
      handlePause();
      // audioRef.current.stopPropagation();
      setIsPlaying(false);
      console.log("stopped load ???");
    } else if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }

    // determines if audio is currently playing (does not trigger on initial page load w autoplay enabled)
    audioRef.current.onplaying = (e: ChangeEvent<HTMLInputElement>) => {
      setIsPlaying(true);
      console.log("audio is playing");
    };
  }

  // format duration
  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  }

  // next track
  function handleNext() {
    setSongIndex((prevState) =>
      prevState >= music.length - 1 ? 0 : prevState + 1,
    );
  }

  // previous track
  function handlePrev() {
    setSongIndex((prevSate) =>
      prevSate <= 0 ? music.length - 1 : prevSate - 1,
    );
  }

  // adjust code if want to add "loop" playlist toggle
  // continuous play
  function handleContinuousPlay() {
    audioRef.current.onended = (e: ChangeEvent<HTMLInputElement>) => {
      if (songIndex < music.length - 1) {
        handleNext();
        console.log("playing next song");
      } else {
        console.log("stopped");
        handleReset();
        setIsPlaying(false);
        // handleStoppedPlaylist();
      }
    };
  }

  // display duration
  function displayDuration() {
    if (isInit || null) {
      return "-:--";
    } else if (isLoading && Number.isNaN(duration)) {
      return <LoadingAnim />;
    } else {
      if (Number.isNaN(duration)) {
        return "Ready to play :)";
      } else {
        return formatDuration(duration);
      }
    }
  }
  // handles using keyboard to control media player
  // function handleKeyDown(e) {
  //   switch (e.keyCode) {
  //     // spacebar
  //     case 32:
  //       handlePlayPause();
  //       break;
  //     // // left arrow
  //     // case 37:
  //     //   handlePrev();
  //     //   break;
  //     // // right arrow
  //     // case 39:
  //     //   handleNext();
  //     //   break;
  //   }
  // }

  // listens for timeUpdate audio events and updates UI
  useEffect(() => {
    const currentVal = audioRef.current;
    currentVal.addEventListener("timeupdate", handleTimeUpdate);

    // window.addEventListener("keydown", handleKeyDown);

    // clean up
    return () => {
      currentVal.removeEventListener("timeupdate", handleTimeUpdate);
      // window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // console.log(audioRef);

  return (
    <div className="music-section">
      <h2 className="mb-2 text-2xl font-bold">Music</h2>
      <audio
        ref={audioRef}
        src={music[songIndex].link}
        // preload="auto"
      ></audio>
      <div className="music-player-container flex gap-4">
        <div className="image-container">
          <div className="outline">
            <Image
              src={music[songIndex].art}
              alt="album artwork for selected song"
              width={270}
              height={270}
            />
          </div>
        </div>
        <div className="player-right-side flex w-full flex-col gap-4">
          <div className="controls-info-container flex gap-4">
            <div className="controls flex flex-col justify-between">
              <button
                onClick={handlePlayPause}
                className="relative size-14 cursor-pointer rounded-xs border"
              >
                {isPlaying ? (
                  <span className="text-3xl">⏸&#xFE0E;</span>
                ) : (
                  <span className="text-3xl">▶</span>
                )}
              </button>

              <div className="flex justify-around">
                <button
                  onClick={handlePrev}
                  className="cursor-pointer font-bold"
                >
                  ⏮&#xFE0E;
                </button>
                <button
                  onClick={handleNext}
                  className="cursor-pointer font-bold"
                >
                  ⏭&#xFE0E;
                </button>
              </div>
            </div>
            <div className="info-container w-full">
              <p className="font-bold">{music[songIndex].name}</p>
              <p className="text-sm">{music[songIndex].album}</p>
              <div className="music-player-time flex items-center gap-1">
                <span className="current-time text-xs">
                  {formatDuration(currentTime)}
                </span>
                <span className="text-xs">/</span>
                <span className="track-duration text-xs">
                  {displayDuration()}
                </span>
              </div>
              <div className="track-slider">
                <input
                  type="range"
                  name="seek-bar"
                  min={0}
                  max={`${duration}`}
                  value={currentTime}
                  onChange={handleSeek}
                  className="h-2.25 w-full cursor-pointer appearance-none overflow-hidden border bg-neutral-100"
                />
              </div>
            </div>
          </div>
          <div className="track-list">
            <ul>
              {music.map((song, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSongIndex(i);
                    handlePlay();
                  }}
                  className={
                    i === songIndex
                      ? "cursor-pointer border-t py-1 text-sm font-bold duration-70 hover:bg-neutral-200 hover:px-2"
                      : "cursor-pointer border-t py-1 text-sm duration-70 hover:bg-neutral-200 hover:px-2"
                  }
                >
                  <button className="cursor-pointer text-left">
                    {song.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
