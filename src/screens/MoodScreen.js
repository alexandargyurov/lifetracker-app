import React from 'react';
import { StatusBar, View } from 'react-native';
import chroma from 'chroma-js'
import styled from 'styled-components/native'
import { ButtonWithIcon } from '../components/patterns/Buttons'

import Slider from "@brlja/react-native-slider";

import * as Animatable from 'react-native-animatable';

export default class MoodScreen extends React.Component {
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
		this.props.navigation.setOptions({ headerStyle: { backgroundColor: this.state.gradient[colour] } })

		if (this.state.previousText !== this.moodToColour(sliderValue).feeling) {
			this.fadeIn()
		}
	}

	componentDidMount() {
		this.props.navigation.setOptions({
			headerStyle: {
				backgroundColor: this.state.backgroundColour, shadowColor: 'transparent',
				shadowOpacity: 0,
				elevation: 0
			}
		})
	}

	fadeIn = () => this.view.bounceIn(1800)
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
						value={0.5}
						onValueChange={(value) => this.transitionColour(value)}
						minimumTrackTintColor="#FFEBE1"
						maximumTrackTintColor="#FFEBE1"
						thumbTintColor="#FFF1EA"
					/>

					<ButtonContainer>
						<ButtonWithIcon onPress={() => this.props.navigation.push('Extra', { backgroundColor: this.state.backgroundColour })} title={'Next'} faIcon={'chevron-right'} faSize={18} />
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