import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarList } from "react-native-calendars";

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { calendarDates: {} };
	}

  specificDay(data, timestamp) {
    if (data.length != 0) {
      this.props.navigation.push("Day", {
        moodId: data[0]["id"],
        date: moment(timestamp).format("dddd Do MMMM")
      });
    } else {
      this.setState({ modalVisible: true, dateSelected: timestamp });
    }
  }

  async componentDidMount() {
    moods = await Moods.all()
    this.setState({calendarDates: MoodsAPI.moodsToCalendar(moods)})
  }

	render() {
		return (
			<Layout style={styles.container} level='1'>

        <CalendarList
          style={style}
          theme={theme}
          current={Date()}
          markingType={"custom"}
          markedDates={this.state.calendarDates}
          onDayPress={day => {
            this.props.navigation.push('SpecificDay', {date: day.dateString});
          }}
          calendarWidth={350}
          pagingEnabled={true}
          scrollEnabled={true}
          pastScrollRange={12}
          futureScrollRange={1}
          horizontal={true}
        />

			</Layout>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	card: {
		margin: 2,
	},
});


export const style = {
  width: 350,
  overflow: "hidden"
};

export const theme = {
  calendarBackground: "#FEF1E0",
  dayTextColor: "#1B4751",
  monthTextColor: "#1B4751",
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 14,
  "stylesheet.calendar.main": {
    week: {
      marginTop: 5,
      marginBottom: 5,
      flexDirection: "row"
    }
  },
  "stylesheet.day.single": {
    base: {
      width: 42,
      height: 42,
      alignItems: "center",
      justifyContent: "center",
      opacity: 20
    },
    text: {
      color: "#1B4751",
      fontSize: 14
    }
  }
};