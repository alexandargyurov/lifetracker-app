import React from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native';
import { CalendarList } from "react-native-calendars";
import styled from 'styled-components/native'

import { Divider } from 'react-native-paper';

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

export default class AccountScreen extends React.Component {
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

        <TouchableOpacity style={{ width: '70%', padding: 20 }}>
          <SubHeader>Notifications</SubHeader>
          <Description>Receive daily reminders to write how your day went.</Description>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '70%', padding: 20 }}>
          <SubHeader>Backup Data</SubHeader>
          <Description>Download and save your data</Description>
        </TouchableOpacity>

        <Divider style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#FFF1EA', height: 1.5 }} />

        <TouchableOpacity style={{ width: '80%', padding: 20 }}>
          <SubHeader>Feedback</SubHeader>
          <Description>Send feedback on any aspects of the app</Description>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '80%', padding: 20 }}>
          <SubHeader>Report a bug</SubHeader>
          <Description>Any issues? Please submit a bug report.</Description>
        </TouchableOpacity>

        <Divider style={{ marginLeft: 20, marginRight: 20, backgroundColor: '#FFF1EA', height: 1.5 }} />

        <TouchableOpacity style={{ width: '80%', padding: 20 }}>
          <TinyText>Version: v1.0.0</TinyText>
          <TinyText>License: GPL v3.0</TinyText>
        </TouchableOpacity>

      </View>


    )
  }
}


const TinyText = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 12px;
  color: #FFF1EA;

`

const SubHeader = styled.Text`
  font-family: Roboto_500Medium;
  color: #FFF1EA;
  font-size: 18px;
`

const Description = styled.Text`
  font-family: Roboto_400Regular;
  color: #FFF1EA;
  font-size: 14px;
`

const MoodWeekContainer = styled.View`
  display: flex;
  height: 150px;
  padding: 18px;
  background-color: #FFF1EA;
  border-radius: 12px;
  margin: 12px;
`