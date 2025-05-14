// config/firebaseAdmin.js
const admin = require("firebase-admin");

// Replace this with the path to your downloaded service account key JSON
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
