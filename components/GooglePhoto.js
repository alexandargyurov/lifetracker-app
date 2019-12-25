import React from "react";
import { TouchableOpacity, Image } from "react-native";

class GooglePhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      borderColor: "#000000",
      borderWidth: 0
    };
  }

  selectPhoto() {
    this.state.selected
      ? (this.setState({
          selected: false,
          borderColor: "#000000",
          borderWidth: 0
        }),
        this.props.updateHeader('remove'))
      : (this.setState({
          selected: true,
          borderColor: "#008000",
          borderWidth: 5
        }), this.props.updateHeader('append'))
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.selectPhoto();
        }}
        style={{width: '33%', marginTop: 6}}
      >
        <Image
          style={{
            width: 125,
            height: 125,
            alignSelf: 'center',
            borderWidth: this.state.borderWidth,
            borderRadius: 2,
            borderColor: this.state.borderColor
          }}
          source={{
            uri: this.props.uri
          }}
        />
      </TouchableOpacity>
    );
  }
}

export default GooglePhoto;
