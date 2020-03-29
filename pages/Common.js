import React from "react";

import { Screen } from "../css/designSystem";
import Header from "../components/Header";
import ActionButton from "../components/ActionButton";
import CalendarView from "../components/CalendarView";


export default class CommonScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.database = global.db;
    this.state = {
      drawerOpen: true
    };
  }

  async componentDidMount() {
    await this.database.fetchDatabase();
  }

  render() {
    return (
      <Screen>
        <Header title={"Overview"} />

        <CalendarView navigation={this.props.navigation} />
        <ActionButton buttonText={"New Record"} navigateTo={"Mood"} />
      </Screen>
    );
  }
}
