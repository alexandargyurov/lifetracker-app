import styled from "@emotion/native";

// SECTIONS

export const Section = styled.View`
  flex: 1;
  background-color: #FEF1E0;
  paddingLeft: 10px;
  paddingRight: 10px;
  paddingTop: 45px;
`

export const Header = styled.View`
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

export const ActionButton = styled.View`
  width: 40%;
  background-color: #7E9CFF;
  border-radius: 400px 400px 500px 500px;
  padding: 10px;
`;

export const NextButton = styled.View`
  background-color: white;
  border-radius: 9999px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 30px;
`;

export const EditButton = styled.View`
  background-color: white;
  border-radius: 9999px;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 50px;
  padding-right: 50px;
  margin: 80px;
`;

// TITLES

export const HeadingMain = styled.Text`
  text-align: center;
  font-size: 26px;
  font-family: 'europaRegular';
  color: #1B4751;
`

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: 'europaBold';
  color: #F2F1E7;
`