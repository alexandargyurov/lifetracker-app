import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons';

export function MoodCardSummary(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <CardLeftBorder>
          <EmotionBorder />
        </CardLeftBorder>

        <CardHeader>
          <Text>Wednesday 16th</Text>
          <FontAwesome5 name="sticky-note" size={16} solid color="#585A79" style={{ marginLeft: 10, marginTop: 4 }} />
          <FontAwesome5 name="star" size={16} solid color="#585A79" style={{ marginLeft: 8, marginTop: 2 }} />
        </CardHeader>

        <CardReasons>

          <Image
            style={{ width: 30, height: 30 }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/" +
                "friends" +
                ".png?alt=media"
            }}
          />

        </CardReasons>


      </Card>
    </TouchableOpacity>
  );
}

const Text = styled.Text`
  font-family: Roboto_700Bold;
  color: #585A79;
  font-size: 18px;
`

const Card = styled.View`
  height: 95px;
  margin: 12px 12px 12px 12px;
  border-radius: 12px;
  background-color: #FFF1EA;
`

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px 12px 0px 18px;
`
const CardReasons = styled.View`
  display: flex;
  flex-direction: row;
  margin: 8px 12px 12px 18px;
`
const CardLeftBorder = styled.View`
  position: absolute;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 10px;
  height: 100%;
`

const EmotionBorder = styled.View`
  background-color: #10CE00;
  border-radius: 3px;
  width: 8px;
  height: 100%;
`