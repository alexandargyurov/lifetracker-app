import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import styled from 'styled-components/native'
import { DrawerActions } from '@react-navigation/native';

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/Buttons'

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
        <StatusBar barStyle="light-content" backgroundColor="#585A79" />

        <MoodWeekContainer>
          <SmallText>This week so far...</SmallText>

          <BarChart>
            <ChartBox>
              <ChartLine style={{ height: '100%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '20%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '80%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '50%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '5%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '100%', backgroundColor: '#10CE00' }} />
            </ChartBox>

            <ChartBox>
              <ChartLine style={{ height: '18%', backgroundColor: '#10CE00' }} />
            </ChartBox>
          </BarChart>

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

        <MoodCardSummary onPress={() => console.log("hello world")}></MoodCardSummary>
        <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>
        <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>
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

const ChartBox = styled.View`
  display: flex;
  align-items: center;
  width: 14px;
`

const ChartLine = styled.View`
  width: 6.5px;
  border-radius: 5px;
`

const BarChart = styled.View`
  display: flex;
  height: 75%;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  transform: rotate(180deg);
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
  display: flex;
  height: 150px;
  padding: 18px;
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