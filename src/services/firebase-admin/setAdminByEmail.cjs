const admin = require("firebase-admin");

// Убедись, что рядом лежит файл serviceAccountKey.json
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Получаем email из аргументов командной строки
const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("❌ Укажите email пользователя. Пример:");
  console.error("   node setAdminByEmail.js user@example.com");
  process.exit(1);
}

const setAdminRoleByEmail = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: "admin" });
    console.log(
      `✅ Роль 'admin' назначена пользователю ${email} (uid: ${user.uid})`
    );
  } catch (error) {
    console.error("❌ Ошибка при назначении роли:", error.message);
  }
};

setAdminRoleByEmail(targetEmail);
