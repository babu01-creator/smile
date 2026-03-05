const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const statusText = document.getElementById("status");

let captured = false;

function distance(a,b){
return Math.sqrt(
Math.pow(a.x-b.x,2) + Math.pow(a.y-b.y,2)
);
}

function captureSelfie(){

if(captured) return;

captured = true;

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

const ctx = canvas.getContext("2d");

ctx.drawImage(video,0,0);

const image = canvas.toDataURL("image/png");

const a = document.createElement("a");

a.href = image;
a.download = "smile_selfie.png";
a.click();

statusText.innerText="Selfie Captured 😁";

}

const faceMesh = new FaceMesh({
locateFile: (file)=>{
return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}
});

faceMesh.setOptions({
maxNumFaces:1,
refineLandmarks:true,
minDetectionConfidence:0.5,
minTrackingConfidence:0.5
});

faceMesh.onResults(results=>{

if(!results.multiFaceLandmarks) return;

const landmarks = results.multiFaceLandmarks[0];

const leftMouth = landmarks[61];
const rightMouth = landmarks[291];
const topLip = landmarks[13];
const bottomLip = landmarks[14];

const mouthWidth = distance(leftMouth,rightMouth);
const mouthHeight = distance(topLip,bottomLip);

const smileRatio = mouthWidth/mouthHeight;

if(smileRatio > 1.8){

statusText.innerText="Smile detected 😁";

captureSelfie();

}else{

statusText.innerText="Please smile 🙂";

}

});

const camera = new Camera(video,{
onFrame: async ()=>{
await faceMesh.send({image:video});
},
width:640,
height:480
});

camera.start();
