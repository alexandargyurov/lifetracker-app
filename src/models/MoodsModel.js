import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import moment from "moment";
import MoodReasons from './MoodReasonsModel'

export default class Moods extends BaseModel {
  constructor(obj) {
    super(obj)
  }

  static get database() {
    return async () => SQLite.openDatabase('lifetrackerV1-testing5.db')
  }

  static get tableName() {
    return 'moods'
  }

  static all() {
    return this.query({ columns: 'id, mood, timestamp' })
  }

  static async currentWeek() {
    const monday = await this.findBy({ timestamp_eq: moment().day("Monday").format('YYYY-MM-DD') })

    const sql = `
      SELECT moods.id, moods.mood, moods.timestamp, reasons.label, reasons.id, notes.notes
      FROM moods
      INNER JOIN mood_reasons ON moods.id = mood_reasons.mood_id
      INNER JOIN reasons ON mood_reasons.reason_id = reasons.id
      LEFT JOIN notes ON moods.id = notes.mood_id
      WHERE moods.id >= ?;
    `
    const params = [monday.id]
    const reasons = await this.repository.databaseLayer.executeSql(sql, params).then(({ rows }) => rows)

    const weeklyMoodsWithReasons = []

    reasons.forEach(query => {
      const obj = Object.create(null)
      obj.timestamp = query.timestamp
      obj.mood_id = query.id
      obj.mood = query.mood
      obj.notes = query.notes
      obj.reasons = []
      obj.reasons.push({ id: query.id, name: query.label })

      if (!weeklyMoodsWithReasons.find(element => element.timestamp == query.timestamp)) {
        weeklyMoodsWithReasons.push(obj)
      } else {
        const indexOfX = weeklyMoodsWithReasons.findIndex(element => element.timestamp == query.timestamp)
        weeklyMoodsWithReasons[indexOfX]['reasons'].push({ id: query.id, name: query.label })
      }
    });

    console.log(weeklyMoodsWithReasons)

    try {
      return this.query({ columns: 'id, mood, timestamp', limit: 7, page: 1, order: 'id ASC', where: { id_gteq: monday.id } })
    } catch {
      return []
    }

  }

  static seed() {
    this.create({ mood: 0.3, timestamp: moment().day("Monday").format('YYYY-MM-DD') })
    this.create({ mood: 0.5, timestamp: moment().day("Tuesday").format('YYYY-MM-DD') })
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