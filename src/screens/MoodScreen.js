import React from 'react';
import { StyleSheet, View, Slider } from 'react-native';
import chroma from 'chroma-js'
import styled from 'styled-components/native'
import { ButtonWithIcon } from '../components/Buttons'

import * as Animatable from 'react-native-animatable';

export default class MoodScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		this.state = {
			backgroundColour: '#00A8DD',
			sliderValue: 0.5714,
			feelingText: "okay",
			previousText: "",
			gradient: chroma.scale(['#BC1B05', "#CF4E25", "#E19945", "#00A8DD", "#00D0DD", "#00DDB5", "#00DD66"]).colors(101)
		};
	}

	moodToColour = (mood) => {
		if (mood <= 0.1429) {
			return { colour: "#BC1B05", feeling: "terrible" };
		} else if (mood <= 0.2857) {
			return { colour: "#CF4E25", feeling: "bad" };
		} else if (mood <= 0.4285) {
			return { colour: "#E19945", feeling: "meh" };
		} else if (mood <= 0.5714) {
			return { colour: "#00A8DD", feeling: "okay" };
		} else if (mood <= 0.7142) {
			return { colour: "#00D0DD", feeling: "alright" };
		} else if (mood <= 0.8571) {
			return { colour: "#00DDB5", feeling: "good" };
		} else if (mood <= 1) {
			return { colour: "#00DD66", feeling: "fantastic" };
		}
	}

	transitionColour(sliderValue) {
		const colour = Math.round((sliderValue + Number.EPSILON) * 100)
		this.setState({ backgroundColour: this.state.gradient[colour], feelingText: this.moodToColour(sliderValue).feeling, previousText: this.moodToColour(sliderValue).feeling })

		if (this.state.previousText !== this.moodToColour(sliderValue).feeling) {
			this.fadeIn()
		}
	}

	fadeIn = () => this.view.fadeIn(1200)
	handleViewRef = ref => this.view = ref;

	render() {
		return (
			<View style={{ backgroundColor: this.state.backgroundColour, flex: 1 }}>

				<Animatable.View ref={this.handleViewRef} style={{ textAlign: 'center' }}>
					<Header>{this.state.feelingText}</Header>
				</Animatable.View>

				<Slider
					style={{ width: 200, height: 40 }}
					minimumValue={0}
					maximumValue={1}
					value={0.5}
					onValueChange={(value) => this.transitionColour(value)}
					minimumTrackTintColor="#FFEBE1"
					maximumTrackTintColor="#FFEBE1"
					thumbTintColor="FFF1EA"
				/>

				<ButtonWithIcon onPress={this.fadeIn} />

			</View>
		)
	}
}

const Header = styled.Text`
	font-family: Roboto_500Medium;
	text-transform: capitalize;
	font-size: 34px;
	text-align: center;
	color: #FFF1EA;
`;