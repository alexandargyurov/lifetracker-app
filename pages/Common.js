import React from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

import styled from "@emotion/native";
import { ActionButton } from "../css/designSystem";

import { CalendarList } from "react-native-calendars";

import t from "../assets/tachyons.css";
import calendarPhaser from "../functions/calendarPhaser";
import Database from "../Database";
import moment from "moment";

import { Section, Header, HeadingMain, CardSquare } from "../css/designSystem";
import { Entypo } from "@expo/vector-icons";

export default class CommonScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Home",
    header: null
  };

  constructor(props) {
    super(props);
    this.database = new Database();
    this.state = {
      calendarDates: {},
      drawerOpen: true
    };
  }

  specificDay(data, timestamp) {
    if (data.length != 0) {
      this.props.navigation.push("Day", {
        moodId: data[0]["id"],
        date: moment(timestamp).format("dddd Do YYYY")
      });
    }
  }

  timestampPhaser(timestamp) {
    this.database.db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM moods WHERE timestamp = ? ORDER BY id DESC;`,
        [moment(timestamp).format("YYYY-MM-DD")],
        (_, { rows: { _array } }) => this.specificDay(_array, timestamp)
      );
    });
  }

  componentDidMount() {
    this.database.fetchDatabase();

    this.database.db.transaction(tx => {
      tx.executeSql(`SELECT * FROM moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ calendarDates: calendarPhaser(_array) })
      );
    });
  }

  render() {
    return (
      <Section>
        <Header>
          <Entypo name="menu" size={32} color="black" style={{ width: '20%'}}/>
          <HeadingMain style={{ width: '60%'}}>Overview</HeadingMain>
          <Entypo name="menu" size={32} color="#FEF1E0" style={{ width: '20%'}}/> 
        </Header>

        <CardSquare>
          <CalendarList
              theme={{
                calendarBackground: '#FEF1E0',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#1B4751',
                monthTextColor: '#1B4751',
                textDayFontFamily: 'europaLight',
                textMonthFontFamily: 'europaLight',
                textDayHeaderFontFamily: 'europaLight',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14
              }}
              current={Date()}
              markingType={"custom"}
              markedDates={this.state.calendarDates}
              onDayPress={day => {
                this.timestampPhaser(day["dateString"]);
              }}
              pastScrollRange={12}
              futureScrollRange={1}
              pagingEnabled={true}
              horizontal={true}
            />
        </CardSquare>

      </Section>
    );
  }
}

//   render() {
//     return (
//       <ScrollView>
//         <Menu>
//           <TouchableOpacity
//             style={{ paddingLeft: 20 }}
//             onPress={this.props.navigation.openDrawer}
//           >
//             <Image
//               style={{ width: 30, height: 30 }}
//               source={require("../assets/ui/hamburger.png")}
//             />
//           </TouchableOpacity>
//         </Menu>

//         <HeadingMain>Overview</HeadingMain>

//         <Container>
//           <CalendarList
//             horizontal={true}
//             pagingEnabled={true}
//             current={Date()}
//             markingType={"custom"}
//             markedDates={this.state.calendarDates}
//             onDayPress={day => {
//               this.timestampPhaser(day["dateString"]);
//             }}
//           />
//         </Container>

//         <TouchableNativeFeedback
//           style={t.pb3}
//           onPress={() => this.props.navigation.push("Mood")}
//           underlayColor="white"
//         >
//           <ActionButton>
//             <Text style={[t.b, t.tc, t.f5, t.white]}>Add entry</Text>
//           </ActionButton>
//         </TouchableNativeFeedback>
//       </ScrollView>
//     );
//   }
// }

// const Container = styled.View``;

// const Menu = styled.View`
//   margin-top: 50px;
// `;
