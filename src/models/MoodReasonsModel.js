import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class MoodReasons extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('lifetrackerV1-testing3.db')
  }

  static get tableName() {
    return 'mood_reasons'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, 
      mood_id: { type: types.INTEGER },
      reason_id: { type: types.INTEGER }
    }
  }
}