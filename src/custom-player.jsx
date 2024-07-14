import React, { useEffect } from "react";
import "./App.css";
import Hls from "hls.js";
// import Simple360Player from "simple-360-player"; // ES6
const CustomPlayer = () => {
  const playerRef = React.createRef();
  const url = "http://46.245.73.240:9880/hi2.m3u8";
  useEffect(() => {
    // let hls: Hls;
    let hls;

    function _initPlayer() {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls();

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(url);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (true) {
            playerRef?.current
              ?.play()
              .catch(() =>
                console.log(
                  "Unable to autoplay prior to user interaction with the dom."
                )
              );
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();
              break;
            default:
              _initPlayer();
              break;
          }
        }
      });

      hls = newHls;
    }
    if (Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [playerRef, url]);

  return <div className="fullscreen"></div>;
};

export default CustomPlayer;
