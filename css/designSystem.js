import styled from "@emotion/native";

// SECTIONS

export const Screen = styled.View`
  flex: 1;
  background-color: #FEF1E0;
  paddingLeft: 10px;
  paddingRight: 10px;
  paddingTop: 45px;
`

export const SectionHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
`

// CARDS

export const CardSquare = styled.View`
  border-radius: 10px;
  border: 1px black;
`

// BUTTONS

export const ButtonMain = styled.View`
  width: 40%;
  background-color: #7E9CFF;
  border-radius: 400px 400px 500px 500px;
  padding: 10px;
`;

// TITLES

export const BigHeading = styled.Text`
  text-align: center;
  font-size: 26px;
  font-family: 'europaRegular';
  color: #1B4751;
`

export const MedHeading = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: 'europaRegular';
  color: #1B4751;
`

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: 'europaBold';
  color: #F2F1E7;
`

export const ReasonIconText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: 'europaBold';
  color: #1B4751;
`

// SLIDER

export const SliderThumb = styled.View`
  margin-bottom: 20px;
  width: 12;
  height: 55;
  border-radius: 5px;
  background-color: #1b4751;
`;