import { SQLite } from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function AddPhotosTable() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY NOT NULL, mood_id INT, google_photo_id TEXT, product_url TEXT, base_url TEXT);"
        );
  
        tx.executeSql(
          "INSERT OR IGNORE INTO migrations (migration) VALUES ('1577276596_add_photos_table');"
        );
      });
    });
}
