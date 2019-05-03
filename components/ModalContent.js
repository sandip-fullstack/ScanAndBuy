import React from 'react';
import { View } from "react-native";
import ItemLabel from "./ItemLabel";
import { HorizontalLine } from './HorizontalLine';
import InventoryDetails from './InventoryDetails';
import ShareQR from './ShareQR';
import RecommendSection from './RecommendSection';

export default class ModalContent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { textToDisplay, dotComUrl, ratings, reviews, quantity, recommendedItems, offers } = this.props;
    const itemName = textToDisplay.split("^")[0];
    const itemId = textToDisplay.split("^")[1];
    const itemLink = textToDisplay.split("^")[2] || "";
    
    return (
      <View>
        <ItemLabel itemName={itemName} itemId={itemId} itemLink={itemLink} ratings={ratings} reviews={reviews} offers={offers}/>
        <HorizontalLine />
        <InventoryDetails dotComUrl={dotComUrl} quantity={quantity}/>
        <ShareQR  data={textToDisplay}/>
        <HorizontalLine />
        <RecommendSection recommendedItems={recommendedItems}/>
      </View>
    );
  }
}