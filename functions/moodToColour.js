export default function moodToColour(mood) {
    if (mood <= 0.2) {
      return {colour: "#7E57C2", feeling: "terrible"};
    } else if (mood <= 0.4) {
      return {colour: "#5C6BC0", feeling: "sad"};
    } else if (mood <= 0.6) {
      return {colour: "#00BCD4", feeling: "OK"};
    } else if (mood <= 0.8) {
      return {colour: "#9CCC65", feeling: "good"};
    } else if (mood <= 1) {
      return {colour: "#4CAF50", feeling: "amazing"};
    }
  }