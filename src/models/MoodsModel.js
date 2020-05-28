import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import moment from "moment";
import MoodsAPI from '../api/MoodsApi'

export default class Moods extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('databasev100.db')
  }

  static get tableName() {
    return 'moods'
  }

  static async currentYear() {
    const sql = `
      SELECT moods.id, moods.mood, moods.timestamp, extras.notes FROM moods
      LEFT JOIN extras ON moods.id = extras.mood_id
      WHERE moods.timestamp >= ? ORDER BY moods.timestamp;
    `
    const params = [moment().day("Monday").subtract(1, 'years').format("YYYY-MM-DD")]
    const entries = await this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)

    const currentYear = []

    entries.forEach(entry => {
      const obj = Object.create(null)
      mood = MoodsAPI.valueToMood(entry.mood)
      obj.mood = {
        id: entry.id,
        value: entry.mood,
        feeling: mood.feeling,
        colour: mood.colour
      }
      obj.notes = entry.notes
      obj.timestamp = entry.timestamp

      currentYear.push(obj)
    })

    return currentYear

  }

  static async currentWeek() {
    const sql = `
      SELECT moods.id AS mood_id, moods.mood, moods.timestamp, reasons.label, reasons.id AS reason_id, extras.notes
      FROM moods
      LEFT JOIN mood_reasons ON moods.id = mood_reasons.mood_id
      LEFT JOIN reasons ON mood_reasons.reason_id = reasons.id
      LEFT JOIN extras ON moods.id = extras.mood_id
      WHERE moods.timestamp >= ? ORDER BY moods.timestamp DESC LIMIT 7;
    `
    const params = [moment().day("Monday").format("YYYY-MM-DD")]
    const reasons = await this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)

    const weeklyMoodsWithReasons = []

    reasons.forEach(entry => {
      const obj = Object.create(null)
      mood = MoodsAPI.valueToMood(entry.mood)
      obj.mood = {
        id: entry.mood_id,
        value: entry.mood,
        feeling: mood.feeling,
        colour: mood.colour
      }
      obj.notes = entry.notes
      obj.date = {
        day: moment(entry.timestamp).format("ddd").toLowerCase(),
        month: moment(entry.timestamp).format("MMMM").toLowerCase(),
        timestamp: moment(entry.timestamp).format("YYYY-MM-DD")
      }
      obj.reasons = []
      obj.reasons.push({ id: entry.reason_id, name: entry.label })

      if (!weeklyMoodsWithReasons.find(element => element.date.timestamp == entry.timestamp)) {
        weeklyMoodsWithReasons.push(obj)
      } else {
        const indexOfX = weeklyMoodsWithReasons.findIndex(element => element.date.timestamp == entry.timestamp)
        weeklyMoodsWithReasons[indexOfX]['reasons'].push({ id: entry.reason_id, name: entry.label })
      }
    });

    return weeklyMoodsWithReasons
  }

  static seed() {
    this.create({ mood: 0.30, timestamp: moment().day("Monday").format('YYYY-MM-DD') })
    this.create({ mood: 0.50, timestamp: moment().day("Tuesday").format('YYYY-MM-DD') })
    this.create({ mood: 0.72, timestamp: moment().day("Wednesday").format('YYYY-MM-DD') })
    this.create({ mood: 0.22, timestamp: moment().day("Thursday").format('YYYY-MM-DD') })
    this.create({ mood: 0.80, timestamp: moment().day("Friday").format('YYYY-MM-DD') })
    this.create({ mood: 0.12, timestamp: moment().day("Saturday").format('YYYY-MM-DD') })
    this.create({ mood: 0.20, timestamp: moment().day("Sunday").format('YYYY-MM-DD') })
  }

  static get columnMapping() {
    return {
      id: { type: types.INTEGER, primary_key: true },
      mood: { type: types.FLOAT },
      timestamp: { type: types.TEXT, default: () => moment(Date.now()).format('YYYY-MM-DD') }
    }
  }
}