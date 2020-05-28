import chroma from 'chroma-js'

export default class MoodsAPI {
	static moodsToCalendar = (data) => {
		dates = {};

		data.forEach(function (entry) {
			date = entry.timestamp
			highlight = entry.notes ? chroma(entry.mood.colour).brighten() : entry.mood.colour

			dates[date] = {
				customStyles: {
					container: {
						backgroundColor: entry.mood.colour,
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
