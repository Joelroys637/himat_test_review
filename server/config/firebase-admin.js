const { initializeApp, cert, getApps } = require('firebase-admin/app');
const path = require('path');

// Initialize Firebase Admin with the service account key
try {
  const serviceAccount = require('../service.json');

  if (!getApps().length) {
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } else {
    console.log("Firebase Admin SDK already initialized.");
  }
} catch (error) {
  console.error("Firebase Admin initialization error:", error.message);
  console.error("Please ensure service.json is present in the server root.");
}

module.exports = {}; // We don't need to export anything, initializeApp registers globally
