import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCe80q7DJZ6Zu1y8iJAYt5OH7RVsYTpVrA",
  authDomain: "todo-app-248ea.firebaseapp.com",
  databaseURL: "https://todo-app-248ea.firebaseio.com",
  projectId: "todo-app-248ea",
  storageBucket: "todo-app-248ea.appspot.com",
  messagingSenderId: "654417649822"
};

firebase.initializeApp(config);

const database = firebase.database();

export { database };