import React from "react";
import { Text, View, StyleSheet, Platform, TouchableNativeFeedback,
  TouchableOpacity, Linking } from "react-native";

import { HorizontalLine } from "./HorizontalLine";

export default class InventoryDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  onlineCheckOut = () => {
    Linking.openURL(this.props.dotComUrl);
  };

  notifyStores = () => {
  }

  notifyMe = () => {

  }

  render() {
    const {quantity} = this.props;
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <View>
        <Text style={styles.headingText}>Quantity Available: {quantity}</Text>
        <View style={styles.container}>
          <Touchable onPress={this.onlineCheckOut}>
            <View style={styles.checkoutButton}>
              <Text style={{
                color: 'white',
                fontSize: 16,
              }}>Checkout Online</Text>
            </View>
          </Touchable>
          
          <Touchable onPress={this.notifyStores}>
            <View style={[styles.checkoutButton, quantity > 0 && styles.disabled]}>
              <Text style={{
                color: 'white',
                fontSize: 16,
              }}>Notify Stores</Text>
            </View>
          </Touchable>
        </View>
        <View style={{alignItems: "center"}}>
          <Touchable onPress={this.notifyMe}>
            <View style={[styles.notifyMe, quantity > 0 && styles.disabled]}>
              <Text style={{
                color: 'white',
                fontSize: 16,
              }}>Notify Me When Available</Text>
            </View>
          </Touchable>
        </View>
        <HorizontalLine />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  checkoutButton: {
    marginTop: 15,
    height: 40,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9D58',
  },
  notifyMe: {
    marginTop: 15,
    height: 40,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9D58',
  },
  disabled: {
    opacity: 0.5
  }
});