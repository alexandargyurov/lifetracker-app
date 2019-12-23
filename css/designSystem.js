import styled from "@emotion/native";
import * as Animatable from "react-native-animatable";

// SECTIONS

export const Screen = styled.View`
  flex: 1;
  background-color: #fef1e0;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 45px;
`;

export const SectionHeader = Animatable.createAnimatableComponent(styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 25px;
`);

// CARDS

export const CardSquare = styled.View`
  border-radius: 10px;
  border: 1px black;
`;

export const CardDotted = styled.View`
  align-items: center;
  justify-content: center;
  width: 95%;
  height: 150px;
  align-self: center;
  border-radius: 1px;
  border-style: dashed;
  color: #1B4751;
`;

// BUTTONS

export const ButtonMain = styled.View`
  width: 40%;
  background-color: #7e9cff;
  border-radius: 400px 400px 500px 500px;
  padding: 10px;
`;

export const ButtonAccept = styled.View`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 60px;
  background-color: #7e9cff;
  border-radius: 400px 400px 500px 500px;
`;

export const ButtonDecline = styled.View`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 70px;
  border-radius: 10px;
`;

// TITLES

export const BigHeading = styled.Text`
  text-align: center;
  font-size: 26px;
  font-family: "europaRegular";
  color: #1b4751;
`;

export const MedHeading = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: "europaRegular";
  color: #1b4751;
`;

export const SmallHeading = styled.Text`
  font-size: 18px;
  font-family: "europaRegular";
  color: #1b4751;
`;

export const MediumText = styled.Text`
  text-align: center;
  font-size: 16px;
  font-family: "europaBold";
  color: #1b4751;
  margin: 5px;
`;

export const SmallText = styled.Text`
  font-size: 16px;
  font-family: "europaLight";
  color: #1b4751;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: "europaBold";
  color: #f2f1e7;
`;

export const ButtonTextSmall = styled.Text`
  font-size: 16px;
  font-family: "europaRegular";
  color: #f2f1e7;
  margin: 10px;
`;

export const ReasonIconText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: "europaBold";
  color: #1b4751;
`;

// SLIDER

export const SliderThumb = styled.View`
  margin-bottom: 20px;
  width: 12;
  height: 55;
  border-radius: 5px;
  background-color: #1b4751;
`;

// MODALS

export const ModalView = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
`;

export const ModalSmall = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  width: 80%;
  height: 150;
`;

export const ModalMedium = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  width: 80%;
  height: 300;
`;

// SPACERS

export const LineSeperator = styled.View`
  width: 85%;
  height: 1px;
  align-self: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1;
  border-bottom-width: 0.5px;
`