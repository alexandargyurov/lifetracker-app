import * as SQLite from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function AlterTimestamps() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql("ALTER TABLE moods RENAME TO tmp;");

      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, mood INT, timestamp DATETIME DEFAULT (strftime('%Y-%m-%d', 'now', 'localtime')) NOT NULL);"
      );

      tx.executeSql(
        "INSERT INTO moods SELECT * FROM tmp;"
      );

      tx.executeSql(
        "DROP TABLE tmp;"
      );

      tx.executeSql(
        "INSERT OR IGNORE INTO migrations (migration) VALUES ('1574432118_alter_timestamp');"
      );
    });
  });
}
