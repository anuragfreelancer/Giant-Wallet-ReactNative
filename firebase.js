// // import messaging from '@react-native-firebase/messaging';

// // export const requestUserPermission = async () => {
// //   const authStatus = await messaging().requestPermission();
// //   const enabled =
// //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
// //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

// //   if (enabled) {
// //     console.log('Authorization status:', authStatus);
// //     getFcmToken();
// //   }
// // };

// // export const getFcmToken = async () => {
// //   const fcmToken = await messaging().getToken();
// //   if (fcmToken) {
// //     console.log('FCM Token:', fcmToken);
// //   } else {
// //     console.log('Failed to get FCM token');
// //   }
// // };

// import firebase from '@react-native-firebase/app';
// import '@react-native-firebase/messaging';

// const firebaseConfig = {
//   apiKey: "AIzaSyA7nIEOgIagMzZLjVwtg6paerJd_mUt6H0",
//   authDomain: "chewbeapp.firebaseapp.com",
//   projectId: "chewbeapp",
//   // storageBucket: "chewbeapp.appspot.com", // FIXED this line
//   messagingSenderId: "43208932533",
//   appId: "1:43208932533:web:79e6aef67d7dbfe7c512fc",
//   measurementId: "G-T7C0EY7W04"
// };

// // ✅ Initialize app only once
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase;
