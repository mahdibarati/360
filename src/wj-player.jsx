import React, { useEffect } from "react";
import "./App.css";
import Hls from "hls.js";
import JWPlayer from "@jwplayer/jwplayer-react";
// import Simple360Player from "simple-360-player"; // ES6
const WJPlayer = () => {
  return (
    <div className="fullscreen">
      <JWPlayer
        library="https://path-to-my-jwplayer-library.js"
        playlist="https://cdn.jwplayer.com/v2/playlists/playlist_media_id"
      />
    </div>
  );
};

export default WJPlayer;
