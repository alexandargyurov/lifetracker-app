import * as SQLite from 'expo-sqlite'
import DatabaseLayer from 'expo-sqlite-orm/src/DatabaseLayer'
import { BaseModel, types } from 'expo-sqlite-orm'

export default class Reasons extends BaseModel {
	constructor(obj) {
		super(obj)
	}

	static get database() {
		return async () => SQLite.openDatabase('lifetrackerV1-testing5.db')
	}

	static get tableName() {
		return 'reasons'
	}

	static all() {
		const options = {
			columns: 'id, label',
			order: 'id ASC'
		}

		return this.query(options)
	}

	static async seedDefaultReasons() {
		const databaseLayer = new DatabaseLayer(async () => SQLite.openDatabase('lifetrackerV1-testing5.db'), 'reasons')
		const reasons = [
			{ label: 'friends' },
			{ label: 'family' },
			{ label: 'walking' },
			{ label: 'exercise' },
			{ label: 'travel' },
			{ label: 'alcohol' },
			{ label: 'dancing' },
			{ label: 'work' },
			{ label: 'colleagues' },
			{ label: 'movies' },
			{ label: 'business' },
			{ label: 'reading' },
			{ label: 'music' },
			{ label: 'concert' },
			{ label: 'driving' },
			{ label: 'eating-out' },
			{ label: 'tea' },
			{ label: 'coffee' },
			{ label: 'home' },
			{ label: 'love' },
			{ label: 'meditation' },
			{ label: 'video-games' },
			{ label: 'board-games' },
			{ label: 'writing' },
			{ label: 'not-feeling-it' },
			{ label: 'bored' },
			{ label: 'tired' },
			{ label: 'stress' },
			{ label: 'cannabis' }
		]

		databaseLayer.bulkInsertOrReplace(reasons)
	}

	static get columnMapping() {
		return {
			id: { type: types.INTEGER, primary_key: true },
			label: { type: types.TEXT, unique: true }
		}
	}
}