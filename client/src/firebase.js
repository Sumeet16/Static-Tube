import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAFXYi2MRmY8s9J3eHLiEg0WulkpJwTRqI",
    authDomain: "statictube-5ddae.firebaseapp.com",
    projectId: "statictube-5ddae",
    storageBucket: "statictube-5ddae.appspot.com",
    messagingSenderId: "185073487270",
    appId: "1:185073487270:web:3a06ada217daff4369d367"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };