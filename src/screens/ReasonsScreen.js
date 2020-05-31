import React from 'react';
import { ScrollView, View } from 'react-native';
import ReasonIcon from '../components/ReasonIcon'
import { TouchableOpacity } from "react-native";
import Reasons from '../models/ReasonsModel'
import styled from 'styled-components/native'
import { ButtonOnlyIcon } from '../components/patterns/Buttons'
import MoodReasons from '../models/MoodReasonsModel';

export default class ReasonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reasons: [], edit: false };
    this.addReason = this.addReason.bind(this);
    this.removeReason = this.removeReason.bind(this);
  }

  async componentDidMount() {
    const reasons = await Reasons.all()
    if (this.props.route.params.reasons) {
      this.props.route.params.reasons.forEach(element => {
        const foundIndex = reasons.findIndex(reason => { return reason.id == element.id })
        reasons[foundIndex].selected = true;
      });
    }

    this.setState({
      reasons: reasons,
      edit: this.props.route.params.edit
    })

    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: this.props.route.params.backgroundColor,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0
      }
    })
  }

  async addReason(reason_id) {
    await MoodReasons.create({ mood_id: this.props.route.params.mood_id, reason_id: reason_id })
  }

  async removeReason(reason_id) {
    const record = await MoodReasons.findBy({ mood_id_eq: this.props.route.params.mood_id, reason_id_eq: reason_id })
    MoodReasons.destroy(record.id)
  }

  render() {
    const buttonTitle = this.state.edit ? "Update" : "Add"
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ backgroundColor: this.props.route.params.backgroundColor }}>
          <Container>
            {this.state.reasons.map((reason, key) => (
              <ReasonIcon
                reason={reason.label}
                reasonId={reason.id}
                addReasonCallback={this.addReason}
                removeReasonCallback={this.removeReason}
                viewOnly={false}
                selected={reason.selected || false}
                backgroundColor={this.props.route.params.backgroundColor}
                key={key}
              />
            ))}
          </Container>
        </ScrollView>

        <TouchableOpacity style={{ position: 'absolute', right: 20, bottom: 20 }}>
          <ButtonOnlyIcon
            title={buttonTitle}
            onPress={() => this.props.navigation.push('Extra', {
              backgroundColor: this.props.route.params.backgroundColor,
              mood_id: this.props.route.params.mood_id,
              edit: this.props.route.params.edit,
              notes: this.props.route.params.notes,
              updateCalendar: this.props.route.params.updateCalendar
            })}
          />
        </TouchableOpacity>
      </View>

    )
  }
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 90px;
`
