/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js");
import FirestoreConfig from "@config/_firestoreConfig";
firebase.initializeApp(FirestoreConfig);

firebase.messaging();
