import { SQLite } from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function AddNotes() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS extras (id INTEGER PRIMARY KEY NOT NULL, mood_id INT, notes TEXT);"
      );

      tx.executeSql(
        `SELECT * FROM moods;`,
        [],
        (_, { rows: { _array } }) => {
          for (const row of _array) {
            tx.executeSql(`INSERT INTO extras (mood_id) VALUES (?);`, [
              row["id"]
            ]);
          }
        }
      );

      tx.executeSql(
        "INSERT OR IGNORE INTO migrations (migration) VALUES ('1577048379_add_notes');"
      );
    });
  });
}
