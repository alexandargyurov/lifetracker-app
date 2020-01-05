import React from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import t from "../assets/tachyons.css";
import styled from "@emotion/native";
import { Screen } from "../css/designSystem";
import Header from "../components/Header"

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Screen>
          <Header title={"What is Life Tracker?"} backButton={true} size='med'/>

          <Text style={[t.tc, t.f5, t.mb4, t.pl3, t.pr3]}>
            Life Tacker is a way to keep track of your feelings and emotions. It
            is a tool to understand yourself more and how your mind works!
          </Text>

          <Reasons>
            <Section>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/ui/psychology.png")}
              />
              <SectionDetails>
                <Text style={[t.b, t.f4]}>1. Always have a record.</Text>
                <Text>
                  Keeping a diary on how your feeling can be very useful, you
                  can always look back and remember those special days, bringing
                  back memories you would of forgotten otherwise.
                </Text>
              </SectionDetails>
            </Section>

            <Section>
              <SectionDetails>
                <Text style={[t.b, t.f4]}>2. Learn about yourself</Text>
                <Text>
                  Tracking your mood and feelings mean you can start learning
                  more about yourself! What are some of the reasons why you’re
                  sad? Are you more happy on weekends? You can use this app to
                  help find out.
                </Text>
              </SectionDetails>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/ui/search.png")}
              />
            </Section>

            <Section style={[t.pb0]}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/ui/brain.png")}
              />
              <SectionDetails style={[t.pl3]}>
                <Text style={[t.b, t.f4]}>3. Keep a healthy mind </Text>
                <Text style={[t.mb3]}>
                  The more you know your mind the more it knows you :) Keeping a
                  healthy mind is important for ourselves and is linked with many
                  benefits.
                </Text>
              </SectionDetails>
            </Section>
          </Reasons>
      </Screen>
    );
  }
}

const Section = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 50px;
`;

const SectionDetails = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100px;
  text-align: justify;
`;

const Reasons = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 12px;
`;
