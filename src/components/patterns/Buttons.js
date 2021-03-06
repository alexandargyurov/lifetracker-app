import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components/native'
import { Normal, Small } from './Texts'

export function ButtonWithIcon(props) {
	const ButtonNormal = styled.View`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 130px;
		height: 40px;
		padding: 10px 2px 10px 2px;
		background-color: #FFF1EA;
		border-radius: 12px;
	`;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<ButtonNormal>
				<Normal bold>{props.title}</Normal>
				<FontAwesome5 name={props.faIcon} size={props.faSize} color="#585A79" style={{ marginLeft: 5, marginTop: 2 }} />
			</ButtonNormal>
		</TouchableOpacity>
	);
}

export function PrimaryButton(props) {
	const ButtonNormal = styled.View`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-self: flex-end;
		padding: 10px 2px 10px 2px;
		background-color: #FFF1EA;
		border-radius: 12px;
	`;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<ButtonNormal>
				<Normal bold>{props.title}</Normal>
			</ButtonNormal>
		</TouchableOpacity>
	);
}

export function SecondaryButton(props) {
	const ButtonNormal = styled.View`
		display: flex;
		flex-direction: row;
		align-self: flex-end;
		padding: 8px;
	`;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<ButtonNormal>
				<Small bold={props.bold}>{props.title}</Small>
			</ButtonNormal>
		</TouchableOpacity>
	);
}

export function ButtonOnlyIcon(props) {
	const ButtonCircle = styled.View`
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 120px;
		height: 65px;
		padding: 10px;
		background-color: #FFF1EA;
		border-radius: 99px;
	`;

	return (
		<TouchableOpacity onPress={props.onPress}>
			<ButtonCircle>
				<Normal bold>{props.title}</Normal>
				<FontAwesome5 name="plus" size={16} color="#585A79" style={{ marginLeft: 5 }} />
			</ButtonCircle>
		</TouchableOpacity>
	);
}

