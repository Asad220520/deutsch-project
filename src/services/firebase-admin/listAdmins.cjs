const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const listAllUsers = async (nextPageToken) => {
  try {
    const result = await admin.auth().listUsers(1000, nextPageToken);
    result.users.forEach((userRecord) => {
      const { email, uid, customClaims } = userRecord;
      const role = customClaims?.role || "user";

      if (role === "admin") {
        console.log(`✅ ADMIN: ${email} (uid: ${uid})`);
      } else {
        console.log(`👤 USER: ${email}`);
      }
    });

    if (result.pageToken) {
      await listAllUsers(result.pageToken); // рекурсивный вызов если есть еще страницы
    }
  } catch (error) {
    console.error("❌ Ошибка при получении пользователей:", error.message);
  }
};

listAllUsers();
