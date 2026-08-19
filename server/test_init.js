const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const serviceAccount = require('./service.json');

try {
  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log("Initialized.");
  } else {
    console.log("Already initialized.");
  }
  const auth = getAuth();
  console.log("Auth is available:", typeof auth.verifyIdToken);
} catch (e) {
  console.error(e);
}
