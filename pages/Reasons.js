import React from "react"
import { ScrollView, Text, View, TouchableNativeFeedback } from "react-native"
import styled, { css } from "@emotion/native"
import ReasonsIcon from "../components/ReasonIcon"

import t from "../assets/tachyons.css";

import { SQLite } from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default class ReasonsScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {reasons: [
            "friends",
            "family",
            "walking",
            "exercise",
            "travel",
            "alcohol",
            "dancing",
            "work",
            "colleagues",
            "movies",
            "business",
            "reading",
            "music",
            "concert",
            "gig",
            "driving",
            "eating-out",
            "tea",
            "coffee",
            "home",
            "love",
            "meditation",
            "yoga",
            "video-games",
            "board-games"
            ]
        }
    }

    componentDidMount() {

        db.transaction(
            tx => {
                tx.executeSql("select * from moods", [], (trans, result) => {
                    console.log("hello")
                    console.log(trans, result)
                });
            }
          )
    }

    render() {
        function convertToSlug(Text)
        {
            return Text
                .toLowerCase()
                .replace(/[^\w ]+/g,'')
                .replace(/ +/g,'-')
                ;
        }

        return (
            <ScrollView>
                <Container>
                    <Text style={[t.tc, t.white, t.fw5, t.f2, t.mt4]}>Why's that?</Text>

                    <Reasons>
                        {this.state.reasons.map((reason, key) =>
                            <ReasonsIcon reason={reason} key={key}/>
                        )}
                    </Reasons>

                    <TouchableNativeFeedback style={t.pb3} onPress={() => this.props.navigation.navigate('Common')} underlayColor="white">
                            <Next>
                                <Text style={[t.b, t.tc, t.f5]}>NEXT</Text>
                            </Next>
                    </TouchableNativeFeedback>

                </Container>
            </ScrollView>
        )
    }
}

const Container = styled.View`
    flex: 1;
	background-color: #D97D54;
`
const Reasons = styled.View`
    display: flex;  
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
`

const Icon = styled.View`
    display: flex;
    width: 33%;
    padding: 5px;
    align-items: center;
`

const Next = styled.View`
    background-color: white;
    border-radius: 9999px;
    padding-top: 25px;
    padding-bottom: 25px;
    padding-left: 50px;
    padding-right: 50px;
    margin: 30px;
`