import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class PhotosModel extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('databasev100.db')
  }

  static get tableName() {
    return 'moods'
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      mood_id: { type: types.INTEGER },
      google_photo_id: { type: types.TEXT },
      product_url: { type: types.TEXT },
      base_url: { type: types.TEXT }
    }
  }
}