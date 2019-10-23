import React from "react"
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native"
import styled, { css } from "@emotion/native"
import ReasonsIcon from "../components/ReasonIcon"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import t from "../assets/tachyons.css";

export default class CommonScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            dates: {
                '2019-10-23': {selected: true, marked: true},
                '2019-10-24': {selected: true, marked: true, dotColor: 'green'},
                '2019-10-25': {marked: true, dotColor: 'red'},
                '2019-10-26': {marked: true},
                '2019-10-27': {disabled: true, activeOpacity: 0}
              }
        }
    }
    
    render() {
        return (
            <ScrollView>
                <Container>
                    <CalendarList horizontal={true} pagingEnabled={true} current={Date()}
                      markingType={'custom'}
                      markedDates={this.state.dates}
                    />
                </Container>
            </ScrollView>
        )
    }
}

const Container = styled.View`
    padding-top: 50px;
`