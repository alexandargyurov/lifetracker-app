import * as SQLite from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function initialiseTables() {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS mood_reasons (id INTEGER PRIMARY KEY NOT NULL, mood_id INT, reason_id INT);"
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS reasons (id INTEGER PRIMARY KEY NOT NULL, label TEXT, UNIQUE(label));"
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS moods (id INTEGER PRIMARY KEY NOT NULL, mood INT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);"
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS migrations (id INTEGER PRIMARY KEY NOT NULL, migration TEXT NOT NULL, UNIQUE(migration));`
        );

        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS db_version (version INTEGER PRIMARY KEY NOT NULL);"
        );

        tx.executeSql(
          `INSERT OR IGNORE INTO reasons (label) values
              ('friends'),
              ('family'),
              ('walking'),
              ('exercise'),
              ('travel'),
              ('alcohol'),
              ('dancing'),
              ('work'),
              ('colleagues'),
              ('movies'),
              ('business'),
              ('reading'),
              ('music'),
              ('concert'),
              ('gig'),
              ('driving'),
              ('eating-out'),
              ('tea'),
              ('coffee'),
              ('home'),
              ('love'),
              ('meditation'),
              ('yoga'),
              ('video-games'),
              ('board-games');
            `
        );

        tx.executeSql(
          "INSERT OR IGNORE INTO migrations (migration) VALUES ('157321877_initialise_tables');"
        );
      },
      function(err) {
        console.log(err);
      }
    );
  });
}
