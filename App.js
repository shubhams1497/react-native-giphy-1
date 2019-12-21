import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button,  Keyboard } from 'react-native';

export default class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '',translatedText:''};
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
  }

  handleTextSubmit(){
    Keyboard.dismiss();
    const translatedText = this.state.text.split(' ').map((word) => word && '🍕').join(' ');  
    this.setState({translatedText: translatedText});
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
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.translatedText}
          </Text>
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
    flex: 10,
    backgroundColor: 'gray'
  }
});

