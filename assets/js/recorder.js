const recordBtn = document.querySelector(".videoCapture__btn"),
  videoPlayer = document.querySelector(".videoCapture__player");

let recorder;
let videoChunks = [];

const getMedia = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      video: { width: 1500, height: 750 }
    });
    configureVideo(stream);
  } catch (error) {
    recordBtn.innerHTML = "☹️ Can't record";
    recordBtn.onclick = null;
  }
};

const startRecording = srcObject => {
  recorder = new MediaRecorder(srcObject);
  recorder.start();
  recorder.addEventListener("dataavailable", event => {
    console.log(event, event.data);
    videoChunks.push(event.data);
  });
  recorder.addEventListener("stop", () => downloadFile(new Blob(videoChunks)));
};

const configureVideo = stream => {
  videoPlayer.srcObject = stream;
  videoPlayer.muted = true;
  videoPlayer.play();
  configureBtn();
  startRecording(videoPlayer.srcObject);
};

const configureBtn = () => {
  recordBtn.innerHTML = "Stop Recording";
  recordBtn.removeEventListener("click", startRecording);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoPlayer.srcObject.getTracks().map(t => t.stop());
  recordBtn.innerHTML = "Start Recording";
  recordBtn.addEventListener("click", startRecording);
  recorder.stop();
};

const downloadFile = blob => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "file.webm";
  document.body.appendChild(link);
  link.click();
};

if (recordBtn) {
  recordBtn.addEventListener("click", getMedia);
}
