var admin = require("firebase-admin");

var serviceAccount = require("./coder-2c796-firebase-adminsdk-i3885-2478edbbfb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coder-2c796.firebaseio.com'
});

console.log('Connected');