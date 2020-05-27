import API from '../api/Api'

export default class MoodsAPI {
	static moodsToCalendar = (data) => {
		dates = {};

		data.forEach(function (element) {
			date = element.timestamp
			mood = element.mood;
			blockColour = API.valueToMood(mood).colour
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
