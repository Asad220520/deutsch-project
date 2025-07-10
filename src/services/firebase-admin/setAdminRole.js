// setAdminClaim.js
const admin = require("firebase-admin");

// Загружаем ключ доступа от Firebase (скачай его с Firebase Console > Settings > Service accounts)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const setAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { role: "admin" });
    console.log(`Admin claim set for UID: ${uid}`);
  } catch (error) {
    console.error("Error setting admin claim:", error);
  }
};

// 🔽 Укажи UID нужного пользователя здесь
setAdminRole("bFTqyrtQ57W5qQBaCO9FMJyGKc62");