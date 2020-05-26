import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Notes extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('databasev100.db')
  }

  static get tableName() {
    return 'extras'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      mood_id: { type: types.INTEGER },
      notes: { type: types.TEXT }
    }
  }
}