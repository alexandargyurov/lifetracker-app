import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native'

import moment from "moment";

import Moods from '../models/MoodsModel'
import { AppLoading } from 'expo';

import { MoodCardSummary } from '../components/MoodCardSummary'
import { ButtonWithIcon } from '../components/patterns/Buttons'
import { Small, Normal } from '../components/patterns/Texts'
import Colours from '../components/patterns/Colours'
import NavigationBalls from '../components/NavigationBalls'

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weekMoods: [], loaded: false };
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

  newEntryPress() {
    this.props.navigation.push('Mood')
  }

  moodToColour = (mood) => {
    if (mood <= 0.1429) {
      return { colour: "#BC1B05", feeling: "terrible" };
    } else if (mood <= 0.2857) {
      return { colour: "#CF4E25", feeling: "bad" };
    } else if (mood <= 0.4285) {
      return { colour: "#E19945", feeling: "meh" };
    } else if (mood <= 0.5714) {
      return { colour: "#00A8DD", feeling: "okay" };
    } else if (mood <= 0.7142) {
      return { colour: "#00D0DD", feeling: "alright" };
    } else if (mood <= 0.8571) {
      return { colour: "#00DDB5", feeling: "good" };
    } else if (mood <= 1) {
      return { colour: "#00DD66", feeling: "fantastic" };
    }
  }

  chartLineStyles(chartDay) {
    const entry = this.state.weekMoods.find(element => { return element.date.day == chartDay });

    try {
      return { height: `${(entry.mood * 100)}%`, backgroundColor: this.moodToColour(entry.mood).colour }
    } catch {
      return { height: `50%`, backgroundColor: '#E7E7E7' }
    }
  }

  async componentDidMount() {
    const weekMoods = await Moods.currentWeek()
    this.setState({ loaded: true, weekMoods: weekMoods })
  }

  render() {
    if (this.state.loaded) {
      return (
        <View style={{ flex: 1, backgroundColor: Colours.purple() }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <WeekOverview>
              <Normal bold>This week so far...</Normal>

              <BarChart>
                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('mon')} />
                  </ChartLineContainer>
                  <WeekDayText>Mon</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('tue')} />
                  </ChartLineContainer>
                  <WeekDayText>Tue</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('wed')} />
                  </ChartLineContainer>
                  <WeekDayText>Wed</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('thu')} />
                  </ChartLineContainer>
                  <WeekDayText>Thu</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('fri')} />
                  </ChartLineContainer>
                  <WeekDayText>Fri</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('sat')} />
                  </ChartLineContainer>
                  <WeekDayText>Sat</WeekDayText>
                </ChartBox>

                <ChartBox>
                  <ChartLineContainer>
                    <ChartLine style={this.chartLineStyles('sun')} />
                  </ChartLineContainer>
                  <WeekDayText>Sun</WeekDayText>
                </ChartBox>
              </BarChart>

            </WeekOverview>

            {this.state.weekMoods.map((entry, key) => (
              <MoodCardSummary
                onPress={() => this.props.navigation.push('SpecificDay')}
                reasons={entry.reasons}
                timestamp={entry.date.timestamp}
                moodColour={this.moodToColour(entry.mood).colour}
                notes={entry.notes}
                key={key}
              />
            ))}

            <ButttonContainer>
              <ButtonWithIcon title='New entry' faIcon='telegram-plane' faSize={20} onPress={() => this.newEntryPress()} />
            </ButttonContainer>

            <NavigationBalls first />

          </ScrollView >
        </View>
      )
    } else {
      return <AppLoading />
    }
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