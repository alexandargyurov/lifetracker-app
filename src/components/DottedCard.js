import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

import Colours from './patterns/Colours'

export const DottedCard = styled.View`
  width: ${Dimensions.get('window').width - 24}px;
  height: 300px;
  align-items: center;
  justify-content: center;
  border-color: ${Colours.light()};
  border-radius: 1px;
  border-width: 1px;
  border-style: dashed;
  margin: 12px;
`;