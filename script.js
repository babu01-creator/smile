const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

function startCamera(){

navigator.mediaDevices.getUserMedia({video:true})
.then(stream => {

video.srcObject = stream;

setTimeout(captureSelfie,5000);

});

}

function captureSelfie(){

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(video,0,0);

const image = canvas.toDataURL("image/png");

const a = document.createElement("a");

a.href = image;
a.download = "selfie.png";
a.click();

alert("Selfie Captured 😁");

}
