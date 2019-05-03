import React from 'react';
import { View, Text, StyleSheet, Linking } from "react-native";

export default class RecommendSection extends React.Component {

  onPressTitle (url) {
    Linking.openURL(url);
  }
  render() {
   const {recommendedItems} = this.props
    return (
      <View>
        <Text style={styles.headingText}>You might also like</Text>
        <View style={styles.container}>
        {
          recommendedItems.map((item) => {
            return(
              <View style={styles.itemChip}>
                <Text onPress={this.onPressTitle.bind(this, item.dotcomUrl)} numberOfLines={1}>{item.dotcomName}</Text>
              </View>
            )
          })
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemChip: {
    padding: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e1f4eb',
    margin: 5,
    borderRadius: 50
  }
})