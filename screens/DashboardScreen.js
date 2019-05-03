import React from "react";
import imagePicker from 'react-native-image-picker';

import { Text, View, Image, StyleSheet } from "react-native";
import Button from "../components/Button";

export default class ImagePicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: ""
    }
  }
  openMenu = ()  => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    console.log("HERE(((")
    imagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
    
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
      }
    });
}
  render () {
    return (
      <View>
        <Button placeholder="Login" onPressButton={this.openMenu} />
        <Image source={this.state.avatarSource || {uri: ""}} style={styles.imageContainer}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 1,
    width: 110,
    height: 100,
    marginRight: 10
  }
});