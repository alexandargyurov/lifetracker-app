import moment from "moment";
import moodToColour from "./moodToColour"

export default function calendarPhaser(data) {
  dates = {};

  data.forEach(function(element) {
    date = moment(element.timestamp).format("YYYY-MM-DD")
    mood = element.mood;

    dates[date] = {
      customStyles: {
        container: {
          backgroundColor: moodToColour(mood)['colour'],
          borderRadius: 0
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
