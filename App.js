import React, { Component } from 'react';
import { ActivityIndicator, Text,TextInput, View, StyleSheet, Button,  Keyboard } from 'react-native';
import {fetchGifs} from './utils/fetchGifs.js';
import ImageList from './components/ImageList.js'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
                  text: '',
                  imageUrls: [],
                  imgStatus: 'init',
                  pageNumber: 1
    };
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.renderResultContent = this.renderResultContent.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePrevButton = this.handlePrevButton.bind(this);
  }

  handleTextSubmit(){
    this.setState({imgStatus: 'loading',pageNumber:1});
    Keyboard.dismiss();
    // const translatedText = this.state.text.split(' ').map((word) => word && '🍕').join(' ');  
    // this.setState({translatedText: translatedText});
    fetchGifs(this.state.text)
    .then((json) => (this.setState({imageUrls: json.hits.map((image) => (image.largeImageURL))
    , imgStatus: 'done'})))
  }

  renderResultContent(){
      switch(this.state.imgStatus){
        case 'init':
          return this.renderNoImageMessage();
        case 'loading':
          return <ActivityIndicator size="large" color="#0000ff"/>;
        case 'done':
          return (this.state.imageUrls.length)?<ImageList imageUrls={this.state.imageUrls}/>:this.renderNoImageMessage();
        default:
          return this.renderNoImageMessage();
      }
  }

  renderNoImageMessage(){
    return <Text style={{fontSize:30,textAlign: "center"}}>No Image To Display</Text>;
  }

  fetchGifsPageNo(pageNo){
    this.setState({pageNumber: pageNo,imgStatus: 'loading'});
    fetchGifs(this.state.text,pageNo)
    .then((json) => (this.setState({imageUrls: json.hits.map((image) => (image.largeImageURL))
    , imgStatus: 'done'})))
  }

  handlePrevButton(){
    if(this.state.pageNumber<=1){
      return;
    }
    const currPageNo = this.state.pageNumber;
    this.fetchGifsPageNo(currPageNo-1);
  }

  handleNextButton(){
    if(this.state.pageNumber>=3){
      return;
    }

    const currPageNo = this.state.pageNumber;
    this.fetchGifsPageNo(currPageNo+1);
  }

  render() {
    return (
      <View style={{padding: 10,flex:1, flexDirection: 'column', marginTop: 50}}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search Images"
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={this.handleTextSubmit}
            value={this.state.text}
          />
          <View style={styles.submitButton}>
            <Button
              title="Search"
              onPress={this.handleTextSubmit}
              color='white'
            />
          </View>
        </View>
        <View style={styles.ResultContainer}>
          {this.renderResultContent()}
        </View>
        <View style={styles.paginationContainer}>
            <Button
              title="Prev"
              disabled={this.state.pageNumber===1}
              onPress={this.handlePrevButton}
            />
            <View style={styles.paginationNumber}>
              <Text style={{fontSize: 18, color: 'blue',fontWeight: 'bold'}}>{this.state.pageNumber}</Text>
            </View>
            <Button
              title="Next"
              disabled={this.state.pageNumber===3 || this.state.imageUrls.length < 5}
              onPress={this.handleNextButton}
            />
        </View>
      </View>
    );
  }
}  

// styles for components
const styles = StyleSheet.create({
  searchContainer:{
    flex: 1, 
    flexDirection: 'row',
  },
  searchBox: {
    flex: 3, 
    fontSize: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
    height: 50
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'blue',
    height: 50,
    marginLeft: 10,
    justifyContent:'center',
    borderRadius: 10
  },
  ResultContainer:{
    flex: 8,
    justifyContent: 'center'
  },
  paginationContainer:{
    flex: 1,
    flexDirection:'row',
    justifyContent: "space-around",
  },
  paginationNumber:{
    padding: 8
  }
});

