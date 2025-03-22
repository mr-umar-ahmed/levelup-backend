const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Path to your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;