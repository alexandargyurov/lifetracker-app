import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { CalendarList } from "react-native-calendars";
import styled from 'styled-components/native'
import { DrawerActions } from '@react-navigation/native';
import Colours from '../components/patterns/Colours'
import { SafeAreaView } from 'react-native-safe-area-context';

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/patterns/Buttons'
import NavigationBalls from '../components/NavigationBalls'
import { Normal, Tiny } from '../components/patterns/Texts'

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

export default class StatisticsScreen extends React.Component {
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
    this.setState({ calendarDates: MoodsAPI.moodsToCalendar(moods) })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colours.purple() }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <CalendarContainer>
            <CalendarList
              style={style}
              theme={theme}
              current={Date()}
              markingType={"custom"}
              firstDay={1}
              hideExtraDays={false}
              markedDates={this.state.calendarDates}
              onDayPress={day => {
                this.props.navigation.push('SpecificDay', { date: day.dateString });
              }}
              calendarWidth={Dimensions.get('window').width - 24}
              pagingEnabled={true}
              scrollEnabled={true}
              pastScrollRange={12}
              futureScrollRange={1}
              horizontal={true}
            />
          </CalendarContainer>

          <CardDotted>
            <Normal lightColour bold>Coming Soon!</Normal>
            <Tiny lightColour light>Get to see data about your emotions and feelings</Tiny>
          </CardDotted>


          <NavigationBalls second />

        </ScrollView>
      </View>
    )
  }
}

const CalendarContainer = styled.View`
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 12px;
  border-radius: 12px;
  overflow: hidden;
`
const CardDotted = styled.View`
  width: ${Dimensions.get('window').width - 24}px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border-color: ${Colours.light()};
  border-radius: 1px;
  border-width: 1px;
  border-style: dashed;
  margin: 12px;
`;

// `
// align-items: center;
// justify-content: center;
// height: 150px;
// width: 150px;
// border-radius: 1px;
// border-style: dashed;
// border-color: ${Colours.light()};
// background-color: ${Colours.light()}
// color: ${Colours.light()};
// `

export const style = {
  width: '100%',
  borderRadius: 12,
  overflow: 'hidden'
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
      flexDirection: "row",
      flexGrow: 1
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
