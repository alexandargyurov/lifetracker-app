import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Slider } from 'react-native'
import chroma from 'chroma-js'

export default class MoodScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

	constructor(props) {
		super(props);
        this.state = { backgroundColour: '#00A8DD', sliderValue: 0.5714, gradient: chroma.scale(['#BC1B05', "#CF4E25", "#E19945", "#00A8DD", "#00D0DD", "#00DDB5", "#00DD66"]).colors(101) };
	}

    transitionColour(sliderValue) {
        const colour = Math.round((sliderValue + Number.EPSILON) * 100)
        this.setState({backgroundColour: this.state.gradient[colour]})
    }

	render() {
		return (
			<View style={{backgroundColor: this.state.backgroundColour, flex: 1}}>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={0}
                    maximumValue={1}
                    value={0.5714}
                    onValueChange={(value) => this.transitionColour(value)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
			</View>
		)
	}
}
