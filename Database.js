import * as SQLite from "expo-sqlite";

const CURRENT_SCHEMA_VERSION = 5;

export default class Database {
  constructor() {
    this.db = SQLite.openDatabase("database.db");
  }

  _migrate() {
    import("./migrations/1573213877_initialise_tables").then(m => m.default());
    import("./migrations/1574432118_alter_timestamp").then(m => m.default());
    import("./migrations/1577048379_add_notes").then(m => m.default());
    import("./migrations/1577276596_add_photos_table").then(m => m.default());
    import("./migrations/1579359297_add_more_reasons").then(m => m.default());
  }

  checkDatabase() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='db_version';`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          }
        );
      });
    });
  }

  async fetchDatabase() {
    const result = await this.checkDatabase();

    if (result.length == 0) {
      this._migrate();
    } else {
      let version = await this.getVersion();
      if (version == CURRENT_SCHEMA_VERSION) {
        console.log("Database up to date");
      } else {
        console.log("Database needs a migration");
        this._migrate();
      }
    }
  }

  getVersion() {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT COUNT(*) FROM migrations;`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array[0]["COUNT(*)"]);
          }
        );
      });
    });
  }

  deleteTable(table) {
    this.db.transaction(tx => {
      tx.executeSql(`DROP TABLE (?);`, [table]);
    });
  }
}
