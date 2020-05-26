import { SQLite } from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'

export default class LegacyDatabase {


  static async mergeLegacy() {
    const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('database.db'))
    databaseLayer.executeSql('SELECT * from moods;').then(response => {
      console.log(response)
    })
  }
}