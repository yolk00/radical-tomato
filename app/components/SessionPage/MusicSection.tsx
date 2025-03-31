// import Image from "next/image"
import { Song } from "@/utils/types";

export default function MusicSection({ songs }: { songs: Song[] }) {
  return (
    <div className="music-section">
      <h2 className="text-2xl font-bold mb-2">Music</h2>
      <div>
        <div className="image-container">{/* <Image /> */}</div>
        <ul>
          {songs.map((song, i) => (
            <li key={i} className="text-sm">
              {song.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
