import moment from "moment";

function moodToColour(mood) {
    if (mood <= 0.2) {
      return "#7E57C2";
    } else if (mood <= 0.4) {
      return "#5C6BC0";
    } else if (mood <= 0.6) {
      return "#00BCD4";
    } else if (mood <= 0.8) {
      return "#9CCC65";
    } else if (mood <= 1) {
      return "#4CAF50";
    }
  }

export default function calendarPhaser(data) {
  dates = {};

  data.forEach(function(element) {
    date = moment(element.timestamp).format("YYYY-MM-DD")
    mood = element.mood;

    dates[date] = {
      customStyles: {
        container: {
          backgroundColor: moodToColour(mood),
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
