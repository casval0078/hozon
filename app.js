// Firebaseの設定
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
