const recordBtn = document.querySelector(".videoCapture__btn"),
  videoPlayer = document.querySelector(".videoCapture__player");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      video: { width: 1500, height: 750 }
    });
    videoPlayer.srcObject = stream;
    videoPlayer.muted = true;
    videoPlayer.play();
    recordBtn.innerHTML = "Stop Recording";
    recordBtn.removeEventListener("click", startRecording);
    recordBtn.addEventListener("click", stopRecording);
  } catch (error) {
    recordBtn.innerHTML = "☹️ Can't record";
    recordBtn.onclick = null;
  }
};

const stopRecording = () => {
  videoPlayer.srcObject.getTracks().map(t => t.stop());
  recordBtn.innerHTML = "Start Recording";
  recordBtn.addEventListener("click", startRecording);
};

if (recordBtn) {
  recordBtn.addEventListener("click", startRecording);
}
