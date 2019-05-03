import React from "react";
import QRCode from "react-native-qrcode-svg";
import { View, Text, StyleSheet, TouchableOpacity,  TouchableNativeFeedback, Platform} from "react-native";
import  Share  from "react-native-share";

export default class ShareQR extends React.Component {

  sendQR = () => {
    this.svg.toDataURL(this.callback);
  }

  callback(dataURL) {
    let shareImageBase64 = {
      title: 'Sharing QR',
      message: 'Hey Buddy!! Please see the item',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
      
    };
    Share.open(shareImageBase64).catch(error => console.log(error));
  }

  render () {
    const { data } = this.props;
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return(
        <View style={styles.container}>
          <QRCode
            value={data}
            getRef={c => (this.svg = c)}
            size={50}
          />
          <Touchable onPress={this.sendQR}>
            <View style={styles.shareButton}>
              <Text style={{
                color: '#000',
                fontSize: 16,
                textDecorationLine: 'underline'
              }}>Share QR code</Text>
            </View>
          </Touchable>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    paddingTop: 10
  },
  shareButton: {
    width: 180,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    color: '#000',
    
  }
});