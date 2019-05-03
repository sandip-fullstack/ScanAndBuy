import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    }
  }
  changeUserName(text) {
    this.setState({
      userName: text
    })
  }
  changePassWord(text) {
    this.setState({
      password: text
    })
  }

  signIn(userName, password) {
    const {navigate} = this.props.navigation;
    navigate("HomeStack")
  }

  render() {
    const { userName="", password="" } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.header}>QReate</Text>
        <Input placeholder="Enter your username" onChangeText={(text) => this.changeUserName(text)}/>
        <Input placeholder="Enter your password" onChangeText={(password) => this.changePassWord(password)}/>
        <Button placeholder="Login" onPressButton={() => {this.signIn(userName, password)}}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: 'white',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#3C4A61',
    padding: 20,
  },
});
