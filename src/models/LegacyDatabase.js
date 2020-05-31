import { AsyncStorage } from 'react-native';
import * as SQLite from 'expo-sqlite';
import moment from 'moment'

export default class LegacyDatabase {
  constructor(dbName) {
    this.legacyDB = SQLite.openDatabase(dbName);
    this.currentDB = SQLite.openDatabase('databasev100.db');
  }

  // MOODS //

  async mergeMoodsTable() {
    this.legacyDB.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM moods;`,
        [],
        (_, { rows: { _array } }) => this.updateMoodsTable(_array)
      );
    });
  }

  async updateMoodsTable(legacyMoods) {
    legacyMoods.forEach(element => {
      this.currentDB.transaction(tx => {
        tx.executeSql(
          `INSERT INTO moods (mood, timestamp) VALUES (?, ?);`,
          [element.mood, moment(element.timestamp).format()]
        );
      });
    });
  }

  // MOOD REASONS //

  async mergeMoodReasonsTable() {
    this.legacyDB.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM mood_reasons;`,
        [],
        (_, { rows: { _array } }) => this.updateMoodReasonsTable(_array)
      );
    });
  }

  async updateMoodReasonsTable(legacyMoodReasons) {
    legacyMoodReasons.forEach(element => {
      this.currentDB.transaction(tx => {
        tx.executeSql(
          `INSERT INTO mood_reasons (mood_id, reason_id) VALUES (?, ?);`,
          [element.mood_id, element.reason_id]
        );
      });
    });
  }

  // EXTRAS //

  async mergeExtrasTable() {
    this.legacyDB.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM extras;`,
        [],
        (_, { rows: { _array } }) => this.updateMoodReasons(_array)
      );
    });
  }

  async updateMoodReasons(legacyExtras) {
    legacyExtras.forEach(element => {
      this.currentDB.transaction(tx => {
        tx.executeSql(
          `INSERT INTO extras (mood_id, notes) VALUES (?, ?);`,
          [element.mood_id, element.notes]
        );
      });
    });
  }

  // REASONS //

  async mergeReasonsTable() {
    this.legacyDB.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM reasons;`,
        [],
        (_, { rows: { _array } }) => this.updateReasonsTable(_array)
      );
    });
  }

  async updateReasonsTable(legacyReasons) {
    legacyReasons.forEach(element => {
      this.currentDB.transaction(tx => {
        tx.executeSql(
          `INSERT INTO reasons (label) VALUES (?);`,
          [element.label]
        );
      });
    });
  }

}