// scripts.js

// Firebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyBf1jDkivK4IjWhK613ysNhlhfJrVa5Z4s",
    authDomain: "hozon-4794d.firebaseapp.com",
    projectId: "hozon-4794d",
    storageBucket: "hozon-4794d.appspot.com",
    messagingSenderId: "363639067783",
    appId: "1:363639067783:web:89c021b8c297cf60e2d422",
    measurementId: "G-NKKQJM5VQY"
};

// Firebaseの初期化
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 新しい投稿をFirestoreに追加
document.getElementById('post-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    db.collection('posts').add({
        title: title,
        content: content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        document.getElementById('post-form').reset();
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
});

// Firestoreから投稿を取得して表示
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    snapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-content">${post.content}</div>
        `;
        postsContainer.appendChild(postElement);
    });
});
