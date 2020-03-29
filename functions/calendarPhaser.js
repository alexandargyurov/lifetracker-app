import moment from "moment";
import moodToColour from "./moodToColour"

export default function calendarPhaser(data) {
  dates = {};

  data.forEach(function (element) {
    date = moment(element.timestamp).format("YYYY-MM-DD")
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
