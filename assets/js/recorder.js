class VideoRecorder {
  constructor() {
    this.recordBtn = document.querySelector(".videoCapture__btn");
    this.videoPlayer = document.querySelector(".videoCapture__player");
    this.recorder;
    this.videoData = [];
    this.videoStream;
    if (this.recordBtn) {
      this.recordBtn.addEventListener("click", this.getMedia);
    }
  }
  getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
        video: { width: 1500, height: 750 }
      });
      this.videoStream = stream;
      this.configureVideo();
    } catch (error) {
      this.recordBtn.innerHTML = "☹️ Can't record";
      this.recordBtn.removeEventListener("click", this.getMedia);
    }
  };
  configureVideo = () => {
    this.startRecording(this.videoStream);
    this.videoPlayer.srcObject = this.videoStream;
    this.videoPlayer.muted = true;
    this.videoPlayer.play();
    this.configureBtn();
  };
  configureBtn = () => {
    this.recordBtn.innerHTML = "Stop Recording";
    this.recordBtn.onclick = null;
    this.recordBtn.removeEventListener("click", this.getMedia);
    this.recordBtn.addEventListener("click", this.stopRecording);
  };
  startRecording = () => {
    this.recorder = new MediaRecorder(this.videoStream);
    this.recorder.start();
    this.recorder.addEventListener("dataavailable", this.addToChunks);
    this.recorder.addEventListener("stop", this.handleStopRecording);
  };
  addToChunks = event => {
    this.videoData.push(event.data);
  };
  handleStopRecording = () => {
    const file = new Blob(this.videoData);
    this.downloadFile(file);
  };
  stopRecording = () => {
    this.videoPlayer.srcObject.getTracks().map(t => t.stop());
    this.recordBtn.innerHTML = "Start Recording";
    this.recorder.stop();
    this.recordBtn.removeEventListener("click", this.stopRecording);
    this.recordBtn.addEventListener("click", this.getMedia);
  };
  downloadFile = file => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "file.webm";
    document.body.appendChild(link);
    link.click();
  };
}

new VideoRecorder();
