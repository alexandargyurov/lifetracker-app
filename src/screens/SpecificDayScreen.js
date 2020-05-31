import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native'

import { Feather } from "@expo/vector-icons";
import { SubHeader, Normal, Small } from '../components/patterns/Texts';

import Colours from '../components/patterns/Colours'

import ReasonsIcon from '../components/ReasonIcon'
import ReasonsModel from '../models/ReasonsModel'
import * as Animatable from "react-native-animatable";

import NotesModal from '../components/NotesModal'
import MoodAPI from '../api/MoodsApi'
import moment from 'moment'

export default class SpecificDayScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reasons: [],
			editable: false,
			showModal: false
		};
	}

	componentDidMount = async () => {
		if (!this.props.route.params.entry.reasons) {
			const reasons = await ReasonsModel.getReasonsByMoodId(this.props.route.params.entry.mood.id)
			this.setState({ reasons: reasons })
		} else {
			this.setState({ reasons: this.props.route.params.entry.reasons })
		}

		this.addEditButtonToHeader()
	}

	addEditButtonToHeader = () => {
		this.props.navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity style={{ padding: 10, marginRight: 8 }}
						onPress={() => this.props.navigation.navigate('Mood', {
							mood: this.props.route.params.entry.mood,
							reasons: this.state.reasons,
							notes: this.props.route.params.entry.notes,
							updateCalendar: this.props.route.params.updateCalendar
						})} >
						<Feather name="edit" size={20} color={Colours.light()} />
					</TouchableOpacity>
				)
			}
		})
	}

	saveNote = async (notes) => {
		if (this.props.route.params.entry.notes !== null) {
			MoodAPI.updateNote(this.props.route.params.entry.mood.id, notes)
		} else {
			MoodAPI.createNote(this.props.route.params.entry.mood.id, notes)
		}

		this.props.route.params.entry.notes = notes
		this.props.route.params.updateCalendar()
		this.setState({ showModal: false })
	}

	noteSection = () => {
		if (this.props.route.params.entry.notes) {
			return (
				<Small lightColour>{this.props.route.params.entry.notes}</Small>
			)
		}
	}

	render() {
		let addButton;

		if (this.state.editable) {
			addButton = (
				<AddButton animation="fadeIn">
					<TouchableOpacity onPress={this.editReasons}>
						<Feather name="plus-circle" size={36} color={Colours.light()} />
					</TouchableOpacity>
				</AddButton>
			);
		}

		return (
			<View style={{ flex: 1, backgroundColor: Colours.purple() }}>
				<ScrollView>
					<SubHeader lightColour center bold style={{ marginTop: 24 }}>
						You were feeling
            <SubHeader bold style={{ color: this.props.route.params.entry.mood.colour }}>
							{" "}{this.props.route.params.entry.mood.feeling}{" "}
						</SubHeader>
						<SubHeader lightColour bold>
							on {"\n"}
							{moment(this.props.route.params.entry.date.timestamp).format("dddd Do MMM")}.
            </SubHeader>
					</SubHeader>

					<Reasons>
						{this.state.reasons.map((reason, key) => (
							<ReasonsIcon
								reason={reason.name}
								reasonId={reason.id}
								viewOnly={true}
								editable={this.state.editable}
								position={key}
								key={key}
							/>
						))}
						{addButton}
					</Reasons>

					<View style={{ margin: 24 }}>
						<NotesHeader>
							<Normal lightColour bold style={{ width: '80%' }}>Notes:</Normal>
							<TouchableOpacity onPress={() => this.setState({ showModal: true })} style={{ width: "15%" }}>
								<Feather
									name="edit"
									size={18}
									color={Colours.light()}
									style={{ textAlign: "right", paddingRight: 10 }}
								/>
							</TouchableOpacity>
						</NotesHeader>

						{this.noteSection()}
					</View>

					<NotesModal
						toggle={this.state.showModal}
						notes={this.props.route.params.entry.notes}
						closeModal={() => this.setState({ showModal: false })}
						saveNote={(notes) => this.saveNote(notes)}
					/>
				</ScrollView>
			</View>
		);
	}
}

const NotesHeader = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 8px;
`

const Reasons = styled.View`
  display: flex;
  flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin: 12px;
`;

const AddButton = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  width: 33%;
  padding-top: 25px;
  padding-bottom: 25px;
  align-items: center;
`);
