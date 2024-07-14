import React from "react";
import videojs from "video.js";
import "videojs-vr";
import "../node_modules/video.js/dist/video-js.css";
import "../node_modules/videojs-vr/dist/videojs-vr.css";

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
      const player = this;
      player.mediainfo = player.mediainfo || {};
      player.mediainfo.projection = "360";
      player.vr({
        projection: "AUTO",
        debug: true,
        forceCardboard: false,
      });
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js"
        ></video>
      </div>
    );
  }
}
