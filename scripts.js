// scripts.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 新しい投稿をFirestoreに追加
document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        await addDoc(collection(db, 'posts'), {
            title: title,
            content: content,
            timestamp: serverTimestamp()
        });
        document.getElementById('post-form').reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

// Firestoreから投稿を取得して表示
const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
onSnapshot(q, (snapshot) => {
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
