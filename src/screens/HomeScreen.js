import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { CalendarList } from "react-native-calendars";
import styled from 'styled-components/native'

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/Buttons'

const data = {
  labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

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
    this.setState({ calendarDates: MoodsAPI.moodsToCalendar(moods) })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#585A79' }}>
        {/* <CalendarList
          style={style}
          theme={theme}
          current={Date()}
          markingType={"custom"}
          markedDates={this.state.calendarDates}
          onDayPress={day => {
            this.props.navigation.push('SpecificDay', { date: day.dateString });
          }}
          calendarWidth={350}
          pagingEnabled={true}
          scrollEnabled={true}
          pastScrollRange={12}
          futureScrollRange={1}
          horizontal={true}
        /> */}

        <MoodWeekContainer>
          <SmallText>This week so far...</SmallText>

          <MoodBarChart>
            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

            <MoodBarChartBox>
              <MoodBarChartLine />
            </MoodBarChartBox>

          </MoodBarChart>

          <WeekContainer>
            <ThinText>Mon</ThinText>
            <ThinText>Tue</ThinText>
            <ThinText>Wed</ThinText>
            <ThinText>Thu</ThinText>
            <ThinText>Fri</ThinText>
            <ThinText>Sat</ThinText>
            <ThinText>Sun</ThinText>
          </WeekContainer>
        </MoodWeekContainer>

        <MoodCardSummary></MoodCardSummary>
        <MoodCardSummary></MoodCardSummary>
        <MoodCardSummary></MoodCardSummary>
        <ButtonWithIcon />
      </View>


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

const MoodBarChartBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 100%;
`

const MoodBarChartLine = styled.View`
  width: 10px;
  height: 50px;
  background-color: #10CE00;
  border-radius: 5px;
`

const MoodBarChart = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%
`

const WeekContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%
`

const ThinText = styled.Text`
  font-family: Roboto_300Light;
  font-size: 14px;
  color: #585A79;

`

const SmallText = styled.Text`
  font-family: Roboto_700Bold;
  color: #585A79;
  font-size: 18px;
`

const MoodWeekContainer = styled.View`
  height: 300px;
  background-color: #FFF1EA;
  border-radius: 12px;
  margin: 12px;
`

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