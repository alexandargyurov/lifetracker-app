import React from "react";
import { SQLite } from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const CURRENT_SCHEMA_VERSION = 1; 

export default class Database {
  constructor() {
    this.db = SQLite.openDatabase("database.db");
  }

  _migrate() {
      import("./migrations/1573213877_initialise_tables").then(m => m.default())
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
}