const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function importLesson(jsonPath) {
  try {
    const fullPath = path.resolve(jsonPath);
    if (!fs.existsSync(fullPath)) {
      console.error("Файл не найден:", fullPath);
      process.exit(1);
    }

    const lessonData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    // Получаем /meta/lessons
    const metaRef = db.collection("meta").doc("lessons");
    const metaSnap = await metaRef.get();

    let lastId = 0;
    if (metaSnap.exists) {
      lastId = metaSnap.data().lastId || 0;
    }

    const newId = lastId + 1;
    const docRef = db.collection("lessons").doc(newId.toString());

    await docRef.set({
      ...lessonData,
      lessonNumber: newId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Обновляем счётчик
    await metaRef.set({ lastId: newId });

    console.log("✅ Урок успешно добавлен с ID:", newId);
  } catch (error) {
    console.error("❌ Ошибка при добавлении урока:", error);
  }
}

// Получаем путь к JSON из аргументов
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error("Укажите путь к JSON файлу урока, например:");
  console.error("node importLesson.cjs ./lesson1.json");
  process.exit(1);
}

importLesson(jsonFilePath);
