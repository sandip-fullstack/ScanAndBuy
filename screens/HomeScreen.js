import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, ScrollView, PermissionsAndroid, TouchableOpacity } from 'react-native';
// import { Constants, BarCodeScanner, Permissions } from 'expo';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions'

import ModalContent from '../components/ModalContent';
import Modal from 'react-native-modalbox';

import dataJSON from "../assets/data.json";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";

var screen = Dimensions.get('window');
var tracker = new GoogleAnalyticsTracker("UA-139441876-1");

export default class HomeScreen extends Component {
  state = {
    hasCameraPermission: null,
    textToDisplay: "",
    dotComUrl: ""
  };

  componentDidMount() {
    // this.onOpenScanner();
  }

  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  _requestCameraPermission = async (permission) => {
    Permissions.request(permission).then(response => {
      this.setState({ hasCameraPermission: response })
    })
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    // this.setState({
    //   hasCameraPermission: status === 'granted',
    // });
  };

  onSuccess(e) {
   this.setState({
    textToDisplay: e.data
    }, this.CB);
  };

  CB() {
    const upc = this.state.textToDisplay.split("^")[1];
    tracker.trackEvent("scannedItem", this.state.textToDisplay.split("^")[0]);
    for (let i=0; i< dataJSON.length; i++) {
      if (dataJSON[i]["upc"] == upc) {
        this.setState({
          dotComUrl: dataJSON[i].dotcomUrl,
          ratings: dataJSON[i].ratings,
          reviews: dataJSON[i].reviews,
          quantity: dataJSON[i].quantity,
          recommendedItems: dataJSON[i].recommendedItems,
          offers: dataJSON[i].offers
        }, () => this.refs.myModal.open());
        break;
      }
    }

    // fetch(`../assets/data.json`)
    // .then((response) => response.json())
    // .then ((resp) => {
    //   this.setState({
    //     dotComUrl: resp.dotcomUrl
    //   },)
    // })
  }

  
  render() {
    const { textToDisplay, dotComUrl, ratings, reviews, quantity, recommendedItems, offers } = this.state;
    return (
      <View>
        <View>
          {/* {this.state.hasCameraPermission === null ?
            <Text>Requesting for camera permission</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Camera permission is not granted</Text> : */}
              <QRCodeScanner
                onRead={this.onSuccess.bind(this)}
                reactivate={true}
                reactivateTimeout={5000}
                showMarker={true}
              />
          {/* } */}
        </View>
        <Modal style={[styles.modal, styles.modal1]} ref={"myModal"} position={"bottom"} swipeArea={50}
          backButtonClose={true}>
          <ScrollView>
            <View style={{width: screen.width, padding: 15}}>
              <ModalContent textToDisplay = {textToDisplay} dotComUrl={dotComUrl}
              ratings={ratings} reviews={reviews} quantity={quantity} recommendedItems={recommendedItems} offers={offers}/>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal1: {
    height: 500
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
