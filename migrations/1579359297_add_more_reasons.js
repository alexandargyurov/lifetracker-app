import * as SQLite from "expo-sqlite";
import { DATABASE_URI } from "react-native-dotenv";
const db = SQLite.openDatabase(DATABASE_URI);

export default function AddMoreReasons() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {  
        tx.executeSql(
            `INSERT OR IGNORE INTO reasons (label) values
            ('writing'),
            ('not-feeling-it'),
            ('bored'),
            ('tired'),
            ('stress'),
            ('cannabis')
          `
      );

        tx.executeSql(
          "INSERT OR IGNORE INTO migrations (migration) VALUES ('1579359297_add_more_reasons');"
        );
      });
    });
}
