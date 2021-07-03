import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBM-G_usfdnjL8O5t3N4Q-YBAs11oFLn2Q",
    authDomain: "recording-app-d037c.firebaseapp.com",
    projectId: "recording-app-d037c",
    storageBucket: "recording-app-d037c.appspot.com",
    messagingSenderId: "512775708570",
    appId: "1:512775708570:web:057489d9072a2506d2e423",
    measurementId: "G-BZGBKN5V17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
storage.useEmulator("localhost", "9199");
const storageRef = storage.ref();

export {storageRef};
export default firebase;