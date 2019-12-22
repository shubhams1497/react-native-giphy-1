import React, { Component } from 'react';
import { Image,View, StyleSheet,SafeAreaView, ScrollView ,Text} from 'react-native';

export default class ImageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const {imageUrls} = this.props;
    return (
      <SafeAreaView style={styles.imageContainer}>  
        <ScrollView style={styles.imageContainerInner}>
            {imageUrls.map((url,idx) => <Image style={styles.imageBody} key={idx} source={{uri: url}}/>)}
        </ScrollView>
      </SafeAreaView>
    )
  }
}  

const styles = StyleSheet.create({
  imageContainer:{
      flex:1
  },
  imageContainerInner:{
      flex:1,
      alignContent: "center"
  },
  imageBody:{
      minHeight:300,
      minWidth:300,
      marginVertical: 5,
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: '#ccc'
  }
});

