import React from 'react';
import { StatusBar, View } from 'react-native';
import chroma from 'chroma-js'
import styled from 'styled-components/native'
import { ButtonWithIcon } from '../components/patterns/Buttons'

import Slider from "@brlja/react-native-slider";

import * as Animatable from 'react-native-animatable';
import Moods from '../models/MoodsModel';
import moment from "moment";

import MoodAPI from '../api/MoodsApi'

export default class MoodScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColour: '#00A8DD',
			sliderValue: 0.5,
			feelingText: "okay",
			previousText: "",
			gradient: chroma.scale(['#BC1B05', "#CF4E25", "#E19945", "#00A8DD", "#00D0DD", "#00DDB5", "#00DD66"]).colors(101)
		};
	}

	transitionColour(sliderValue) {
		const colour = Math.round((sliderValue + Number.EPSILON) * 100)
		const mood = MoodAPI.valueToMood(sliderValue)
		this.setState({ sliderValue: sliderValue, backgroundColour: this.state.gradient[colour], feelingText: mood.feeling, previousText: mood.feeling })
		this.props.navigation.setOptions({
			headerStyle: {
				backgroundColor: this.state.gradient[colour],
				shadowColor: 'transparent',
				shadowOpacity: 0,
				elevation: 0
			}
		})
		if (this.state.previousText !== mood.feeling) {
			this.fadeIn()
		}
	}

	async submitMood() {
		if (this.state.edit) {
			Moods.update({ id: this.props.route.params.mood.id, mood: this.state.sliderValue, })
			this.props.navigation.push('Reasons', {
				backgroundColor: this.state.backgroundColour,
				mood_id: this.props.route.params.mood.id,
				reasons: this.props.route.params.reasons,
				notes: this.props.route.params.notes,
				edit: true
			})
		} else {
			try {
				mood = await Moods.create({ mood: this.state.sliderValue, timestamp: moment(this.props.route.params.date).format() })
			} catch {
				mood = await Moods.create({ mood: this.state.sliderValue, timestamp: moment().format() })
			}

			this.props.navigation.push('Reasons', {
				backgroundColor: this.state.backgroundColour,
				mood_id: mood.id,
				edit: false
			})
		}
	}

	updateNavigationHeader(colour) {
		this.props.navigation.setOptions({
			headerStyle: {
				backgroundColor: this.state.backgroundColour || colour,
				shadowColor: 'transparent',
				shadowOpacity: 0,
				elevation: 0
			}
		})
	}

	componentDidMount() {
		try {
			this.transitionColour(this.props.route.params.mood.value)
			this.props.navigation.setOptions({ title: "How did the day go?" })
			this.setState({
				feelingText: this.props.route.params.mood.feeling,
				edit: true
			})
		} catch {
			this.updateNavigationHeader()
		}
	}

	fadeIn = () => this.view.fadeIn()
	handleViewRef = ref => this.view = ref;

	render() {
		return (
			<View style={{ backgroundColor: this.state.backgroundColour, flex: 1 }}>
				<StatusBar barStyle="light-content" backgroundColor={this.state.backgroundColour} />
				<Container>
					<Animatable.View ref={this.handleViewRef} style={{ textAlign: 'center' }}>
						<Header>{this.state.feelingText}</Header>
					</Animatable.View>

					<Slider
						style={{ width: 275, height: 40, marginTop: 100, marginBottom: 50 }}
						trackStyle={{ width: 275, height: 10, borderRadius: 12 }}
						thumbStyle={{ width: 34, height: 34, borderRadius: 99 }}
						minimumValue={0}
						maximumValue={1}
						value={this.state.sliderValue}
						onValueChange={(value) => this.transitionColour(value)}
						minimumTrackTintColor="#FFEBE1"
						maximumTrackTintColor="#FFEBE1"
						thumbTintColor="#FFF1EA"
					/>

					<ButtonContainer>
						<ButtonWithIcon onPress={() => this.submitMood()} title={'Next'} faIcon={'chevron-right'} faSize={18} />
					</ButtonContainer>
				</Container>
			</View>
		)
	}
}

const Header = styled.Text`
	font-family: Medium;
	text-transform: capitalize;
	font-size: 50px;
	text-align: center;
	color: #FFF1EA;
`;

const Container = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
`

const ButtonContainer = styled.View`
	align-self: flex-end;
	margin-right: 50px;
`