import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class MoodReasons extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('lifetrackerV1-testing5.db')
  }

  static get tableName() {
    return 'mood_reasons'
  }

  static seed() {
    this.create({ mood_id: 1, reason_id: 1 })
    this.create({ mood_id: 2, reason_id: 2 })
    this.create({ mood_id: 3, reason_id: 3 })
    this.create({ mood_id: 4, reason_id: 4 })
    this.create({ mood_id: 5, reason_id: 5 })
    this.create({ mood_id: 6, reason_id: 6 })
    this.create({ mood_id: 7, reason_id: 7 })
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      mood_id: { type: types.INTEGER },
      reason_id: { type: types.INTEGER }
    }
  }
}