"use client";

import { useState } from "react";
import { fetchData } from "./fetchData";

export default function Home() {
  const [albums, setAlbums] = useState([]);

  async function handleFetchData() {
    const data = await fetchData();
    if (data) setAlbums(data);
  }

  return (
    <div>
      <main>
        <div className="pt-6 flex flex-col items-center justify-center">
          <button className="p-2 rounded-xl bg-blue-500" onClick={handleFetchData}>Fetch Albums</button>
        </div>
        <div className="pt-6 flex flex-col items-center">
          {albums.map((album) => (
            <div key={album.id}>
              <p>{album.title} by {album.artist} - ${album.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
