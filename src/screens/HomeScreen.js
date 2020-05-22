import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native'
import { DrawerActions } from '@react-navigation/native';

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/Moods'

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/Buttons'
import { ThinText, SmallText } from '../components/Texts'
import Colours from '../components/Colours'

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
        <WeekOverview>
          <BarChart>
            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '100%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>

              <ChartLineContainer>
                <ChartLine style={{ height: '70%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '50%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '35%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '20%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '10%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>

            <ChartBox>
              <ChartLineContainer>
                <ChartLine style={{ height: '5%', backgroundColor: Colours.green() }} />
              </ChartLineContainer>
              <WeekDayText>Mon</WeekDayText>
            </ChartBox>
          </BarChart>

        </WeekOverview>

        <MoodCardSummary onPress={() => console.log("hello world")}></MoodCardSummary>
        <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>
        <MoodCardSummary onPress={() => DrawerActions.openDrawer()}></MoodCardSummary>
        <ButtonWithIcon />
      </View >
    )
  }
}

const ChartBox = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  height: 100%;
  transform: rotate(180deg);
`

const WeekDayText = styled(ThinText)`
  height: 10%;
  transform: rotate(180deg);
  text-align: justify;
`

const ChartLineContainer = styled.View`
  height: 90%;
`

const ChartLine = styled.View`
  width: 4px;
  border-radius: 4px;
`

const BarChart = styled.View`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  flex-direction: row;
`
const WeekOverview = styled.View`
  display: flex;
  height: 300px;
  background-color: #FFF1EA;
  border-radius: 12px;
  margin: 12px;
`