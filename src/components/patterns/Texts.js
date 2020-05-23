import styled from 'styled-components/native'
import Colours from './Colours';

const allowCustomProps = props => props.styles ? props.styles : ""

const fontWeight = (props) => {
	if (props.light) return "font-family: Light"
	if (props.medium) return "font-family: Medium"
	if (props.bold) return "font-family: Bold"
}

const fontColour = (props) => {
	if (props.lightColour) return "color: " + Colours.light()
	if (props.warmColour) return "color: " + Colours.warm()
}

const Text = styled.Text`
  font-family: Regular;
  color: ${Colours.purple()};
	textAlignVertical: bottom;
`;

export const Tiny = styled(Text)`
	font-size: 12px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const Smaller = styled(Text)`
	font-size: 14px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const Small = styled(Text)`
	font-size: 16px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const Normal = styled(Text)`
	font-size: 18px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const SubHeader = styled(Text)`
	font-size: 22px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const Header = styled(Text)`
	font-size: 28px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

export const HugeHeader = styled(Text)`
	font-size: 36px;
	${props => fontWeight(props)};
	${props => fontColour(props)};
	${allowCustomProps};
`;

const ReasonText = styled.Text`
  font-family: Medium;
  text-transform: capitalize;
  font-size: 14px;
  text-align: center;
  color: #FFF1EA;
  margin-top: 14px;
`