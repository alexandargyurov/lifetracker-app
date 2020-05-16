import { AsyncStorage } from 'react-native';

import Moods from '../models/MoodsModel'
import Reasons from '../models/ReasonsModel'
import MoodsReasons from '../models/MoodReasonsModel'

const moodToColour = (mood) => { 
	if (mood <= 0.2) {
		return { colour: "#7E57C2", highlightColour: "#AF8CED", feeling: "terrible" };
	} else if (mood <= 0.4) {
		return { colour: "#5C6BC0", highlightColour: "#A7B4FF", feeling: "sad" };
	} else if (mood <= 0.6) {
		return { colour: "#00BCD4", highlightColour: "#85E7F4", feeling: "OK" };
	} else if (mood <= 0.8) {
		return { colour: "#9CCC65", highlightColour: "#CFF89F", feeling: "good" };
	} else if (mood <= 1) {
		return { colour: "#4CAF50", highlightColour: "#8BE58F", feeling: "amazing" };
	}
}

export default class MoodsAPI {		
	static moodsToCalendar = (data) => {
		dates = {};

		data.forEach(function (element) {
			date = element.timestamp
			mood = element.mood;
			blockColour = moodToColour(mood)
			highlight = blockColour['colour'];
		
			if (element.notes) {
			highlight = blockColour['highlightColour']
			}
		
			dates[date] = {
				customStyles: {
					container: {
						backgroundColor: blockColour['colour'],
						borderRadius: 4,
						borderBottomWidth: 4,
						borderBottomColor: highlight,
					},
					text: {
						color: "white"
					}
				},
				selected: true
			};
		});
		
		return dates;
	}
}
