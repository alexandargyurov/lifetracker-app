import { AsyncStorage } from 'react-native';

import Moods from '../models/MoodsModel'
import Reasons from '../models/ReasonsModel'
import MoodsReasons from '../models/MoodReasonsModel'
import Notes from '../models/NotesModel'
import Photos from '../models/PhotosModel'
import LegacyDatabase from '../models/LegacyDatabase'

export default class API {
	static initDatabase = async () => {
		console.log('CREATING DB')
		await Moods.createTable()
		await Reasons.createTable()
		await MoodsReasons.createTable()
		await Notes.createTable()
		await Photos.createTable()
		console.log('CREATING DB DONE\n')
	}

	static seedDatabase = async () => {
		await Reasons.seedDefaultReasons()
	}

	static mergeDatabases = async () => {
		await this.resetDB()
		await this.initDatabase()

		console.log('MERGING LEGACY DB')
		let legacyDB = new LegacyDatabase()
		await legacyDB.mergeMoodsTable();
		await legacyDB.mergeMoodReasonsTable();
		await legacyDB.mergeExtrasTable();
		await legacyDB.mergeReasonsTable();
		console.log('MERGING LEGACY DB DONE\n')

	}

	static resetDB = async () => {
		console.log('RESETTING DB')
		await Moods.dropTable()
		await Reasons.dropTable()
		await MoodsReasons.dropTable()
		await Notes.dropTable()
		await Photos.dropTable()
		console.log('RESETTING DB DONE\n')
	}


	static userExists = async () => {
		try {
			const value = await AsyncStorage.getItem('@User:last_active');
			if (value === null) {
				return false
			} else {
				return true
			}
		} catch (error) {
			return error
		}
	}

	static updateLastActive = async () => {
		try {
			await AsyncStorage.setItem('@User:last_active', Date.now().toString());
		} catch (error) {
			return error
		}
	}

}




