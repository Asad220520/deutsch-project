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
    // Полный путь к JSON
    const fullPath = path.resolve(jsonPath);
    if (!fs.existsSync(fullPath)) {
      console.error("Файл не найден:", fullPath);
      process.exit(1);
    }

    // Читаем JSON с уроком
    const lessonData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

    // Добавляем в коллекцию lessons
    const docRef = await db.collection("lessons").add({
      ...lessonData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Урок добавлен с ID:", docRef.id);
  } catch (error) {
    console.error("Ошибка при добавлении урока:", error);
  }
}

// Получаем путь к JSON из аргументов (node importLesson.cjs путь_к_файлу.json)
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.error("Пожалуйста, укажите путь к JSON файлу урока, например:");
  console.error("node importLesson.cjs ./lesson1.json");
  process.exit(1);
}

importLesson(jsonFilePath);
