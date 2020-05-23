import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native'
import { DrawerActions } from '@react-navigation/native';

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/patterns/Buttons'
import { Small, Normal } from '../components/patterns/Texts'
import Colours from '../components/patterns/Colours'
import NavigationBalls from '../components/NavigationBalls'

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
      <View style={{ flex: 1, backgroundColor: Colours.purple() }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <WeekOverview>
            <Normal bold>This week so far...</Normal>

            <BarChart>
              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '50%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Mon</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '70%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Tue</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '66%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Wed</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '35%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Thu</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '57%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Fri</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '62%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Sat</WeekDayText>
              </ChartBox>

              <ChartBox>
                <ChartLineContainer>
                  <ChartLine style={{ height: '90%', backgroundColor: Colours.green() }} />
                </ChartLineContainer>
                <WeekDayText>Sun</WeekDayText>
              </ChartBox>
            </BarChart>

          </WeekOverview>

          <MoodCardSummary onPress={() => console.log("hello world")}></MoodCardSummary>
          <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>
          <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>

          <ButttonContainer>
            <ButtonWithIcon title='New entry' faIcon='telegram-plane' />
          </ButttonContainer>

          <NavigationBalls first />

        </ScrollView >
      </View>
    )
  }
}

const ChartBox = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  transform: rotate(180deg);
`

const WeekDayText = styled(Small)`
  font-family: Light;
  font-size: 14px;
  transform: rotate(180deg);
  text-align: justify;
  padding-top: 8px;
`

const ChartLineContainer = styled.View`
  height: 80%;
`

const ChartLine = styled.View`
  width: 4px;
  border-radius: 4px;
`

const BarChart = styled.View`
  height: 80%;
  justify-content: space-evenly;
  flex-direction: row;
`
const WeekOverview = styled.View`
  display: flex;
  justify-content: space-evenly;
  height: 190px;
  background-color: #FFF1EA;
  border-radius: 12px;
  margin: 12px;
  padding: 12px;
`

const ButttonContainer = styled.View`
  align-items: flex-end;
  padding: 12px;
`