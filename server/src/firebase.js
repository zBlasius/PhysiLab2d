var firebase = require("firebase-admin");
var serviceAccount = require("../serviceAccount.json");

export default firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
