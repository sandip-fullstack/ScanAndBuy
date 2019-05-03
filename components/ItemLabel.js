import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableHighlight, Dimensions } from "react-native";

import VideoPlayer from 'react-native-video-controls';
import Toast, {DURATION} from 'react-native-easy-toast';
import CustomStar from './CustomStar';

import TextTicker from 'react-native-text-ticker'
import downloadManager from "react-native-simple-download-manager";

export default class ItemLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoModal: false,
      visible: false
    }
  }
  
  checkURL(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)/) != null) {
      return "image";
    } else if (url.match(/\.(pdf|docx|csv|xslx)/) != null) {
      return "pdf";
    } else return "video";
  }

  openVideoModal() {
    this.setState({
      showVideoModal: true
    })
  }

  hideToast = () => {
    this.setState({
      visible: false,
    });
  };

  downloadPDF = (urlLink) => {
    const configuration = {
      downloadTitle: "Manual book",
      downloadDescription:
        "This is a product manual",
      saveAsName: "manual",
      allowedInRoaming: true,
      allowedInMetered: true,
      showInDownloads: true,
      external: false, //when false basically means use the default Download path (version ^1.3)
      path: "Download/" //if "external" is true then use this path (version ^1.3)
    };
    downloadManager
    .download((url = urlLink), (headers = {}), (config = configuration))
    .then(response => {
      this.refs.toast.show('Download Complete');
    })
    .catch(err => {
      this.refs.toast.show('Download Failed');
    });
  }

  getContennt = (contentType, itemLink) => {
    if (contentType === "image") {
      return (<Image source={{uri: itemLink}} style={styles.imageContainer}/>)
    } else if (contentType === "video") {
      return (<TouchableOpacity activeOpacity = { .8 } onPress={() => this.openVideoModal(itemLink) }>
          <Image
            source={require("../assets/images/videoplaceholder.png")}
            style={[styles.imageContainer, styles.videoContainer]}
          />
        </TouchableOpacity>);
    } else {
      return (<TouchableOpacity activeOpacity = { .8 } onPress={() => this.downloadPDF(itemLink) }>
          <Image
            source={require("../assets/images/pdf-logo.jpg")}
            style={styles.imageContainer}
          />
        </TouchableOpacity>);
    }
  }

  render() {
   const { itemName, itemId, itemLink, ratings, reviews, offers } = this.props;
   const contentType = this.checkURL(itemLink);
   
    return (
      <View style={styles.container}>
      <Toast
        ref="toast"
        style={{backgroundColor:"#F8B786"}}
        position="top"
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={3000}
        opacity={1}
        textStyle={{color:'#000'}}
      />
      {
        this.getContennt(contentType, itemLink)
      }
      
        <View style={styles.itemLabelContainer}>
          <Text style={styles.itemName}>{itemName}</Text>
          <View style={styles.container}>
            <View style={styles.starRating}><CustomStar starCount={ratings} /></View>
            <Text style={styles.starRating}>{reviews} reviews</Text>
          </View>
          <TextTicker
              style={{ fontSize: 16, color: "green" }}
              duration={4000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}
            >{offers}</TextTicker>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showVideoModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
          style={{ margin: 22 }}>
          <View>
            <View style={styles.modalViewContainer}>
              <VideoPlayer
                source={{uri: itemLink}}
                style={{ width: 320, height: 400 }}
              />
              <TouchableHighlight
                onPress={() => 
                  this.setState({showVideoModal: false})
                }>
                <Text>Close Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
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
    marginRight: 10,
    resizeMode: 'contain',
  },
  videoContainer: {
    resizeMode: 'cover',
  },
  itemLabelContainer: {
    flex: 3
  },
  itemName: {
    fontSize: 18
  },
  starRating: {
    fontSize: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  modalViewContainer: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width*0.8,
    height: Dimensions.get('window').height*0.7,
    alignSelf: 'center',
    top: Dimensions.get('window').height*0.20,
    borderRadius: Dimensions.get('window').height*0.03,
    alignItems: 'center'
  }
});