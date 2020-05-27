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

	static valueToMood = (mood) => {
		if (mood <= 0.1429) {
			return { colour: "#BC1B05", feeling: "terrible" };
		} else if (mood <= 0.2857) {
			return { colour: "#CF4E25", feeling: "bad" };
		} else if (mood <= 0.4285) {
			return { colour: "#E19945", feeling: "meh" };
		} else if (mood <= 0.5714) {
			return { colour: "#00A8DD", feeling: "okay" };
		} else if (mood <= 0.7142) {
			return { colour: "#00D0DD", feeling: "alright" };
		} else if (mood <= 0.8571) {
			return { colour: "#00DDB5", feeling: "good" };
		} else if (mood <= 1) {
			return { colour: "#00DD66", feeling: "fantastic" };
		}
	}
}




