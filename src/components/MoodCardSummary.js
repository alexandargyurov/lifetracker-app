import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native'
import { FontAwesome5 } from '@expo/vector-icons';

import { Small } from './patterns/Texts'
import Colours from './patterns/Colours';


export function MoodCardSummary(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card>
        <CardLeftBorder>
          <EmotionBorder />
        </CardLeftBorder>

        <CardHeader>
          <Small bold>Wednesday 16th</Small>
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

          <Image
            style={{ width: 30, height: 30, marginLeft: 12 }}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/life-tracker-app-c52bf.appspot.com/o/" +
                "family" +
                ".png?alt=media"
            }}
          />
        </CardReasons>
      </Card>
    </TouchableOpacity>
  );
}



const Card = styled.View`
  height: 95px;
  margin: 12px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${Colours.light()};
`

const CardHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 8px;
`
const CardReasons = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-left: 8px;
`
const CardLeftBorder = styled.View`
  position: absolute;
  margin-top: 12px;
  margin-bottom: 12px;
  height: 100%;
`

const EmotionBorder = styled.View`
  background-color: ${Colours.green()};
  border-radius: 3px;
  width: 6px;
  height: 100%;
`