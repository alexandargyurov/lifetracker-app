import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

export default function createDatabase(props) {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists mood_reasons (id integer primary key not null, mood_id int, reason_id int);"
    );

    tx.executeSql(
      "create table if not exists reasons (id integer primary key not null, label text, UNIQUE(label));"
    );

    tx.executeSql(
      "create table if not exists moods (id integer primary key not null, mood int, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL);"
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
  });
}
