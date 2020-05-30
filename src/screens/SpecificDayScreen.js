import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native'

import { Feather } from "@expo/vector-icons";
import { SubHeader, Normal, Small } from '../components/patterns/Texts';

import Colours from '../components/patterns/Colours'

import ReasonsIcon from '../components/ReasonIcon'
import ReasonsModel from '../models/ReasonsModel'
import * as Animatable from "react-native-animatable";

import ModalTest from '../components/Modal'

export default class SpecificDayScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reasons: [],
			editable: false,
			showModal: false
		};
		this.editReasons = this.editReasons.bind(this);
		this.removeReason = this.removeReason.bind(this);
	}

	async componentDidMount() {
		if (!this.props.route.params.entry.reasons) {
			const reasons = await ReasonsModel.getReasonsByMoodId(this.props.route.params.entry.mood.id)
			this.setState({ reasons: reasons })
		} else {
			this.setState({ reasons: this.props.route.params.entry.reasons })
		}

		this.addEditButtonToHeader()
	}

	addEditButtonToHeader() {
		this.props.navigation.setOptions({
			headerRight: () => {
				return (
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Mood', { mood: this.props.route.params.entry.mood, reasons: this.state.reasons })} style={{ padding: 10, marginRight: 8 }} >
						<Feather name="edit" size={20} color={Colours.light()} />
					</TouchableOpacity>
				)
			}
		})
	}

	editReasons() {
		this.props.navigation.push("Reasons", {
			moodId: this.state.mood_id,
			viewOnly: false,
			edit: true,
			selected: this.state.reasons,
			reasonsCallback: this.updateReasons
		});
	}

	updateReasons() {
		this.toggleEdit();
		this.renderReasons(true);
	}

	toggleEdit() {
		this.setState({ editable: !this.state.editable });
	}

	removeReason = reasonId => {
		this.state.reasons.filter(function (reason) {
			if (reason.reason_id == reasonId) {
				reason.selected = false;
			}
		});
	};

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
							{"Wednesday 16th May"}.
            </SubHeader>
					</SubHeader>

					<Reasons>
						{this.state.reasons.map((reason, key) => (
							<ReasonsIcon
								reason={reason.name}
								reasonId={reason.id}
								reasonCallback={() => console.log("what what how?")}
								removeReasonCallback={() => console.log("remove me")}
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
							<TouchableOpacity onPress={this.toggleEdit} style={{ width: "15%" }}>
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

					<ModalTest toggle={this.state.showModal} closeModal={() => this.setState({ showModal: false })} />
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
