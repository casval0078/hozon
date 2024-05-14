// scripts.js

// Firebaseの設定
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
