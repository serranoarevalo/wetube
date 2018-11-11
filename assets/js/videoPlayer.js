import getBlobDuration from "get-blob-duration";
const videoContainer = document.querySelector(".video__container");
let videoPlayer,
  playBtn,
  volumeBtn,
  currentTime,
  timerInterval,
  totalTime,
  fullScreenBtn,
  volumeRange;

const PLAY_ICON = `<i class="fas fa-play"></i>`;
const PAUSE_ICON = `<i class="fas fa-pause"></i>`;
const VOLUME_MEDIUM = `<i class="fas fa-volume-down"></i>`;
const VOLUME_MUTED = `<i class="fas fa-volume-mute"></i>`;
const VOLUME_OFF = `<i class="fas fa-volume-off"></i>`;
const VOLUME_FULL = `<i class="fas fa-volume-up"></i>`;
const FULLSCREEN = `<i class="fas fa-expand"></i>`;
const FULLSCREEN_OUT = `<i class="fas fa-compress"></i>`;

const formatDate = seconds => {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

const handlePlayBtn = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playerPauseIcon();
    startTimerInterval();
  } else {
    playerPlayIcon();
    videoPlayer.pause();
    stopTimerInterval();
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
  stopTimerInterval();
  playerPlayIcon();
  setTime();
};

const setTime = () => {
  currentTime.innerHTML = formatDate(Math.ceil(videoPlayer.currentTime));
};

const startTimerInterval = () => {
  timerInterval = setInterval(setTime, 1000);
};

const stopTimerInterval = () => {
  clearInterval(timerInterval);
};

const getDuration = async () => {
  const blob = await fetch(videoPlayer.src).then(r => r.blob());
  const duration = await getBlobDuration(blob);
  totalTime.innerHTML = formatDate(Math.floor(duration));
};

const exitFullScreen = () => {
  fullscreenIcon();
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScreenBtn.removeEventListener("click", exitFullScreen);
  fullScreenBtn.addEventListener("click", enterFullScreen);
};

const enterFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  outFullScreenIcon();
  fullScreenBtn.removeEventListener("click", enterFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};

const handleVolumeChange = event => {
  const {
    target: { value }
  } = event;
  const parsedValue = parseFloat(value);
  console.log(parsedValue);

  if (value < 0.3) {
    volumeOffIcon();
  } else if (value < 0.7) {
    volumeMediumIcon();
  } else {
    volumeFullIcon();
  }

  videoPlayer.volume = value;
};

const volumeMuteIcon = () => (volumeBtn.innerHTML = VOLUME_MUTED);
const volumeMediumIcon = () => (volumeBtn.innerHTML = VOLUME_MEDIUM);
const volumeFullIcon = () => (volumeBtn.innerHTML = VOLUME_FULL);
const volumeOffIcon = () => (volumeBtn.innerHTML = VOLUME_OFF);

const playerPlayIcon = () => (playBtn.innerHTML = PLAY_ICON);
const playerPauseIcon = () => (playBtn.innerHTML = PAUSE_ICON);

const fullscreenIcon = () => (fullScreenBtn.innerHTML = FULLSCREEN);
const outFullScreenIcon = () => (fullScreenBtn.innerHTML = FULLSCREEN_OUT);

const initVideoPlayer = () => {
  videoPlayer = videoContainer.querySelector(".video__player");
  playBtn = videoContainer.querySelector("#js-play");
  volumeBtn = videoContainer.querySelector("#js-volume");
  currentTime = videoContainer.querySelector("#video__current-time");
  totalTime = videoContainer.querySelector("#video__total-time");
  fullScreenBtn = videoContainer.querySelector("#js-fullscreen");
  volumeRange = videoContainer.querySelector("#js-volume-range");
  getDuration();
  playBtn.addEventListener("click", handlePlayBtn);
  volumeBtn.addEventListener("click", handleVolumeClick);
  videoPlayer.addEventListener("ended", handleEnded);
  fullScreenBtn.addEventListener("click", enterFullScreen);
  volumeRange.addEventListener("input", handleVolumeChange);
  videoPlayer.volume = 0.5;
};

if (videoContainer) {
  initVideoPlayer();
}
