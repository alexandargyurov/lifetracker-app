import { AsyncStorage } from 'react-native';

import Moods from '../models/MoodsModel'
import Reasons from '../models/ReasonsModel'
import MoodsReasons from '../models/MoodReasonsModel'
import Notes from '../models/NotesModel'
import Photos from '../models/PhotosModel'

export default class API {
	static initDatabase = async () => {
		console.log('RESETTING DB')
		await Moods.dropTable()
		await Reasons.dropTable()
		await MoodsReasons.dropTable()
		await Notes.dropTable()
		await Photos.dropTable()

		await Moods.createTable()
		await Reasons.createTable()
		await MoodsReasons.createTable()
		await Notes.createTable()
		await Photos.createTable()
	
		await Reasons.seedDefaultReasons()
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




