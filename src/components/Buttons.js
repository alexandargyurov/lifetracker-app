import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons';

export function ButtonWithIcon(props) {
	// Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
	return (
		<TouchableOpacity onPress={props.onPress}>
			<ButtonNormal>
				<Text>Next</Text>
				<FontAwesome5 name="arrow-right" size={18} color="#585A79" />
			</ButtonNormal>
		</TouchableOpacity>
	);
}

const ButtonNormal = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 110px;
	height: 40px;
	padding: 10px 2px 10px 2px;
	background-color: #FFF1EA;
	border-radius: 12px;
`;

const Text = styled.Text`
	font-family: Roboto_500Medium;
	font-size: 18px;
	color: #585A79;
	margin-right: 5px;
`