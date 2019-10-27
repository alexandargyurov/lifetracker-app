import React from "react"
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native"
import styled, { css } from "@emotion/native"
import {CalendarList} from 'react-native-calendars';

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("database.db");

export default class CommonScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.calendarPhaser = this.calendarPhaser.bind(this);
        this.moodToColour = this.moodToColour.bind(this);
        this.state = {
            calendarDates: {}
        }
    }
    
    calendarPhaser (data) {
        dates = {}

        data.forEach(function(element) {
            date = element.timestamp.split(" ")[0]
            mood = element.mood

            if (mood <= 20) {
                this.colour = "#7E57C2"
            } else if (mood <= 40) {
                this.colour = "#5C6BC0"
            } else if (mood <= 60) {
                this.colour = "#00BCD4"
            } else if (mood <= 80) {
                this.colour = "#9CCC65"
            } else if (mood <= 100) {
                this.colour = "#4CAF50"
            }

            dates[date] = {
                customStyles: {
                  container: {
                    backgroundColor: this.colour,
                    borderRadius: 0
                  },
                  text: {
                    color: 'white',
                  }
                },
                selected: true
            }
          })

        this.setState({calendarDates: dates})
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
                      markedDates={this.state.calendarDates}
                      onDayPress={(day) => {console.log('selected day', day)}}
                    />
                </Container>
            </ScrollView>
        )
    }
}

const Container = styled.View`
    padding-top: 50px;
`