let methods = {
  pause: () => {
    api.playPause();
    if (api.playerState == 0) {
      this.isplaying = true;
      this.$emit("play-start");
    } else {
      this.isplaying = false;
      this.$emit("play-stop");
    }
  },
  stop: () => {
    api.stop();
    this.isplaying = false;
    this.$emit("play-stop");
  },
  zoomIn: () => {
    if (api.settings.display.scale <= 0.9) {
      api.settings.display.scale += 0.1;
      api.updateSettings();
      api.render();
    } else {
      api.settings.display.scale = 1;
    }
  },
  zoomOut: () => {
    if (api.settings.display.scale > 0.2) {
      api.settings.display.scale -= 0.1;
      api.updateSettings();
      api.render();
    } else {
      api.settings.display.scale = 0.2;
    }
  },
  fullscreen: () => {
    document.getElementsByClassName("at-main")[0].requestFullscreen();
  },
  switchRenderingTrack: (track) => {
    api.renderTracks([track]);
    api.score.tracks.forEach((item, index) => {
      if (track.index == index) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    // console.log(this.tracks);
  },
  mute: (track) => {
    api.changeTrackMute([track], !track.playbackInfo.isMute);
    track.playbackInfo.isMute = !track.playbackInfo.isMute;
    // console.log(track.name, "muted/unmuted");
  },
  solo: (track) => {
    api.changeTrackSolo([track], !track.playbackInfo.isSolo);
    track.playbackInfo.isSolo = !track.playbackInfo.isSolo;
    // track.playbackInfo.isSolo = true;
    // console.log(track.name, "solo/unsolo");
  },
  volume: (volumeValue, track) => {
    api.changeTrackVolume([track], volumeValue / 33.4);
  },
};
