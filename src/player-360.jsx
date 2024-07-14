import React, { useEffect } from "react";
import "./App.css";
import Simple360Player from "./player/pl";

const canvasStyle = { top: 0, left: 0, position: "relative" };
const videoStyle = { display: "none" };
const playerRef = React.createRef();
const videoTagRef = React.createRef();
// import Simple360Player from "simple-360-player"; // ES6
const Player = () => {
  useEffect(() => {
    let container = document.getElementById("player-container");
    // window.createSimple360Player = (container) => new Simple360Player(container);
    // window.player = new Simple360Player(container); // container is an HTML container for the 360 player
    window.player = new Simple360Player(container, videoTagRef, playerRef);
    window.player.init();
    window.player.videoElement.src = "/test.mp4"; // "http://46.245.73.240:9880/hi2.m3u8"; // cross domain will not work!
    //window.player.videoElement.src = "http://46.245.73.240:9880/hi2.m3u8"; // "http://46.245.73.240:9880/hi2.m3u8"; // cross domain will not work!
    window.player.start();
  }, []);
  return (
    <div>
      <div>
        <div id="player-container" style={{ width: 640, height: 360 }}></div>
        <div>
          <canvas style={canvasStyle} ref={playerRef}></canvas>
          <video style={videoStyle} ref={videoTagRef}>
            <source
              src="http://46.245.73.240:9880/hi2.m3u8"
              type="video/mp4"
            ></source>
          </video>
        </div>
        <button onClick={() => window.player.videoElement.play()}>play</button>
        <button onClick={() => window.player.videoElement.pause()}>
          pause
        </button>
        <button onClick={() => window.player.videoElement.destroy()}>
          destroy
        </button>
      </div>
      {/* <button onclick="window.player.videoElement.play()">play</button>
      <button onclick="window.player.videoElement.pause()">pause</button>
      <button onclick="window.player.destroy()">destroy</button> */}
    </div>
  );
};

export default Player;
