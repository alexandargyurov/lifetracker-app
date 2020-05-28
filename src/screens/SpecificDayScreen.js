import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native'

import { Feather } from "@expo/vector-icons";
import { SubHeader, Normal, Small } from '../components/patterns/Texts';

import Colours from '../components/patterns/Colours'

import ReasonsIcon from '../components/ReasonIcon'
import ReasonsModel from '../models/ReasonsModel'

export default class SpecificDayScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reasons: [],
			editable: false
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
				<View style={{ margin: 24 }}>
					<Normal lightColour bold style={{ marginBottom: 8 }}>Notes:</Normal>
					<Small lightColour>{this.props.route.params.entry.notes}</Small>
				</View>
			)
		}
	}

	render() {
		const { navigation } = this.props;
		let addButton;
		let editButton = (
			<TouchableOpacity onPress={this.toggleEdit} style={{ width: "15%" }}>
				<Feather
					name="edit"
					size={28}
					color="#1B4751"
					style={{ textAlign: "right", paddingRight: 10 }}
				/>
			</TouchableOpacity>
		);

		if (this.state.editable) {
			addButton = (
				<AddButton animation="fadeIn">
					<TouchableOpacity onPress={this.editReasons}>
						<Feather name="plus-circle" size={36} color="#1B4751" />
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
								reasonCallback={this.removeReason}
								viewOnly={true}
								editable={this.state.editable}
								position={key}
								buttonCallback={this.renderNoteSection}
								key={key}
							/>
						))}
						{addButton}
					</Reasons>

					{this.noteSection()}


				</ScrollView>
			</View>
		);
	}
}

const Reasons = styled.View`
  display: flex;
  flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin: 12px;
`;

const AddButton = styled.View`
  display: flex;
  width: 33%;
  padding-top: 25px;
  padding-bottom: 25px;
  align-items: center;
`;
