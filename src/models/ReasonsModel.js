import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Reasons extends BaseModel {
	constructor(obj) {
		super(obj)
	}

	static get database() {
		return async () => SQLite.openDatabase('lifetrackerV1-testing3.db')
	}

	static get tableName() {
		return 'reasons'
	}

	static all() {
		const options = {
			columns: 'id, name',
			order: 'id ASC'
		}

		return this.query(options)
	}

	static async seedDefaultReasons() {
		const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('lifetrackerV1-testing3.db'), 'reasons')
		const reasons = [
			{ name: 'friends' },
			{ name: 'family' },
			{ name: 'walking' },
			{ name: 'exercise' },
			{ name: 'travel' },
			{ name: 'alcohol' },
			{ name: 'dancing' },
			{ name: 'work' },
			{ name: 'colleagues' },
			{ name: 'movies' },
			{ name: 'business' },
			{ name: 'reading' },
			{ name: 'music' },
			{ name: 'concert' },
			{ name: 'driving' },
			{ name: 'eating-out' },
			{ name: 'tea' },
			{ name: 'coffee' },
			{ name: 'home' },
			{ name: 'love' },
			{ name: 'meditation' },
			{ name: 'video-games' },
			{ name: 'board-games' },
			{ name: 'writing' },
			{ name: 'not-feeling-it' },
			{ name: 'bored' },
			{ name: 'tired' },
			{ name: 'stress' },
			{ name: 'cannabis' }
		]

		databaseLayer.bulkInsertOrReplace(reasons)
	}

	static get columnMapping() {
		return {
			id: { type: types.INTEGER, primary_key: true },
			name: { type: types.TEXT, unique: true }
		}
	}
}