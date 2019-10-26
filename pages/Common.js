import React from "react"
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native"
import styled, { css } from "@emotion/native"
import ReasonsIcon from "../components/ReasonIcon"
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import t from "../assets/tachyons.css";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

export default class CommonScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.calendarPhaser = this.calendarPhaser.bind(this);
        this.state = {
            dates: {
                '2019-10-22': {selected: true},
              }
        }
    }
    
    calendarPhaser (data) {
        data.forEach(function(element) {
            date = element.timestamp.split(" ")[0]
            
          })
    }

    componentDidMount() {
        db.transaction(tx => {
            tx.executeSql(
                `select * from moods;`,
                [],
                (_, { rows: { _array } }) => this.calendarPhaser(_array)
              );
          });
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