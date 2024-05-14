// Firebaseの設定
var firebaseConfig = {
    apiKey: "AIzaSyBf1jDkivK4IjWhK613ysNhlhfJrVa5Z4s",
    authDomain: "hozon-4794d.firebaseapp.com",
    projectId: "hozon-4794d",
    storageBucket: "hozon-4794d.appspot.com",
    messagingSenderId: "363639067783",
    appId: "1:363639067783:web:89c021b8c297cf60e2d422",
    measurementId: "G-NKKQJM5VQY"
};
// Firebaseを初期化
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

function displayMedia() {
    // StorageからメディアファイルのURLを取得
    var storageRef = storage.ref();
    var mediaRef = storageRef.child('path/to/media.mp4'); // ここを適宜変更

    mediaRef.getDownloadURL().then(function(url) {
        var video = document.createElement('video');
        video.src = url;
        video.controls = true;
        document.getElementById('mediaContainer').appendChild(video);
    }).catch(function(error) {
        console.error("Error loading the video:", error);
    });
}

window.onload = displayMedia;
