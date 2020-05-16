import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import moment from "moment";

export default class Moods extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('lifetrackerV1-testing3.db')
  }

  static get tableName() {
    return 'moods'
  }

  static all() {
    const options = {
      columns: 'id, mood, timestamp'
    }
    
    return this.query(options)
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true }, 
      mood: { type: types.FLOAT },
      timestamp: { type: types.TEXT, default: () => moment(Date.now()).format('YYYY-MM-DD') }
    }
  }
}