import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyCyRXClEMR-xLRiqbGEAJUo5GON6lCex4w",
    authDomain: "image-uploader-9342f.firebaseapp.com",
    projectId: "image-uploader-9342f",
    storageBucket: "image-uploader-9342f.appspot.com",
    messagingSenderId: "520127614951",
    appId: "1:520127614951:web:33c95bd4e87b6c161d3742",
    measurementId: "G-62YDNGB1PQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { 
    storage, firebase
as default}