import { SQLite } from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function AddNotes() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS extras (id INTEGER PRIMARY KEY NOT NULL, notes TEXT);"
        );

      tx.executeSql(
        "INSERT OR IGNORE INTO migrations (migration) VALUES ('1577048379_add_notes');"
      );
    });
  });
}
