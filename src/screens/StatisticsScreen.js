import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { CalendarList } from "react-native-calendars";
import styled from 'styled-components/native'

import Colours from '../components/patterns/Colours'
import { DottedCard } from '../components/DottedCard'

import moment from "moment";

import Moods from '../models/MoodsModel'
import MoodsAPI from '../api/MoodsApi'
import API from '../api/Api'

import Modal from '../components/Modal'

import NavigationBalls from '../components/NavigationBalls'
import { Normal, Tiny } from '../components/patterns/Texts'

export default class StatisticsScreen extends React.Component {
  constructor(props) {
    super(props);
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const needsUpdating = await API.doesCalendarNeedUpdating()
      if (needsUpdating) {
        API.resetCalendarUpdate()
        this.updateCalendar()
      }
    });
    this.state = {
      calendarDates: {},
      yearEntries: [],
      showModal: false,
      selectedDay: null
    };
  }

  pushToMood = (date) => {
    this.setState({ showModal: false })
    this.props.navigation.push('Mood', {
      date: date.dateString
    })
  }

  pushOrModal = (day) => {
    const entry = this.state.yearEntries.find(element => { return moment(element.date.timestamp).format('YYYY-MM-DD') == day.dateString })

    if (entry) {
      this.props.navigation.push('SpecificDay', {
        entry: entry
      })
    } else {
      this.setState({ showModal: true, selectedDay: day })
    }
  }

  async componentDidMount() {
    await this.updateCalendar()
  }

  updateCalendar = async () => {
    moods = await Moods.currentYear()
    this.setState({ calendarDates: MoodsAPI.moodsToCalendar(moods), yearEntries: moods })
  }

  componentWillUnmount() {
    this._unsubscribe();
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
              hideArrows={false}
              markedDates={this.state.calendarDates}
              onDayPress={(day) => this.pushOrModal(day)}
              calendarWidth={Dimensions.get('window').width - 24}
              pagingEnabled={true}
              scrollEnabled={true}
              pastScrollRange={12}
              futureScrollRange={1}
              horizontal={true}
            />
          </CalendarContainer>

          <DottedCard>
            <Normal lightColour bold>Coming Soon!</Normal>
            <Tiny lightColour light>Get to see data about your emotions and feelings</Tiny>
          </DottedCard>

          <Modal
            toggle={this.state.showModal}
            cancelResponse={() => this.setState({ showModal: false })}
            confirmResponse={() => this.pushToMood(this.state.selectedDay)}
          />

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

export const style = {
  width: '100%',
  borderRadius: 12,
  overflow: 'hidden'
};

export const theme = {
  calendarBackground: "#FEF1E0",
  dayTextColor: "#1B4751",
  monthTextColor: "#1B4751",
  arrowColor: Colours.purple(),
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
