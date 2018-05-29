var config = {
    apiKey: "AIzaSyBGKDks96Sp3VtZZN3jTkkngvX9PGyZhcQ",
    authDomain: "social-playground-2510b.firebaseapp.com",
    databaseURL: "https://social-playground-2510b.firebaseio.com",
    projectId: "social-playground-2510b",
    storageBucket: "social-playground-2510b.appspot.com",
    messagingSenderId: "835628707024"
  };

firebase.initializeApp(config);

const db = firebase.database();
const db_root = db.ref();
const rooms = db_root.child('Rooms');
const room_global = rooms.child('Global');
const global_messages = room_global.child('Messages');

const servertime = firebase.database.ServerValue.TIMESTAMP;
