const admin = require('./config/firebase');

const testToken = async () => {
  try {
    const token = 'YOUR_NEW_ID_TOKEN'; // Replace with your actual token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Decoded Token:', decodedToken);
  } catch (err) {
    console.error('Token Verification Failed:', err.message);
  }
};

testToken();