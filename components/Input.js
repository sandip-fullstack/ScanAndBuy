import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image } from 'react-native';

const Input = ({
  placeholder="",
  placeholderTextColor='white',
  imgUrl,
  onChangeText
}) => <View style={styles.textInput}>
  {/* <Image style={styles.icon} source={require("../assets/group.png")}
  /> */}
  <TextInput
    style={{
        fontSize: 15,
        height: 50,
        flex: 1,
        color: 'white'
      }}
      autoCorrect={false}
      spellCheck={false}
      underlineColorAndroid='transparent'
      placeholder={placeholder}
      placeholderTextColor='white'
      onChangeText={(text) => onChangeText(text)}
    />
</View>

export default Input

const styles = StyleSheet.create({
  icon: {
      width: 25,
      height: 25,
      marginRight: 15,
  },
  textInput: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: '#686C7E',
  }
});