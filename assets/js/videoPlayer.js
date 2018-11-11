const videoContainer = document.querySelector(".video__container");
let videoPlayer, playBtn, volumeBtn;

const PLAY_ICON = `<i class="fas fa-play"></i>`;
const PAUSE_ICON = `<i class="fas fa-pause"></i>`;
const VOLUME_MEDIUM = `<i class="fas fa-volume-down"></i>`;
const VOLUME_MUTED = `<i class="fas fa-volume-off"></i>`;

const handlePlayBtn = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playerPauseIcon();
  } else {
    playerPlayIcon();
    videoPlayer.pause();
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeMediumIcon();
  } else {
    videoPlayer.muted = true;
    volumeMuteIcon();
  }
};

const handleEnded = () => {
  videoPlayer.currentTime = 0;
  playerPlayIcon();
};

const volumeMuteIcon = () => (volumeBtn.innerHTML = VOLUME_MUTED);
const volumeMediumIcon = () => (volumeBtn.innerHTML = VOLUME_MEDIUM);

const playerPlayIcon = () => (playBtn.innerHTML = PLAY_ICON);
const playerPauseIcon = () => (playBtn.innerHTML = PAUSE_ICON);

const initVideoPlayer = () => {
  videoPlayer = videoContainer.querySelector(".video__player");
  playBtn = videoContainer.querySelector("#js-play");
  volumeBtn = videoContainer.querySelector("#js-volume");
  playBtn.addEventListener("click", handlePlayBtn);
  volumeBtn.addEventListener("click", handleVolumeClick);
  videoPlayer.addEventListener("ended", handleEnded);
  videoPlayer.volume = 0.5;
};

if (videoContainer) {
  initVideoPlayer();
}
