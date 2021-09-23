import admin from "firebase-admin";
import emoji from 'node-emoji'
import serviceAccount from "./coder-2c796-firebase-adminsdk-i3885-2478edbbfb.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coder-2c796.firebaseio.com",
});
const db = admin.firestore();

console.log(emoji.get("fire"), "Connected");

export default db;