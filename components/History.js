import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableHighlight, ScrollView, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Accordion } from 'native-base';

// let arr = [];
let hist = [];

export default class History extends Component {

  state = {
    isLoading: true,
    activeSections: [],
  };

  changeState(isSelected){
    this.setState({ isSelected: !this.state.isSelected });
  }

  componentDidMount(){
    this._retrieveData().then((arr) => {
      this.setState({
        isLoading: false
      });
    });
  }


  _retrieveData = async () => {
    try {
    await AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, data) => {
        data.map((result, i, dat) => {
          // let key = dat[i][0];
          let value = JSON.parse(dat[i][1]); 
          let elemCity = value["city"].split(" ");
          let elemDate = value["dateRequest"].split(" "); 
          value["dateRequest"] = elemDate[1] + " " + elemDate[0];
          
          value["city"]="";
          for(var str in elemCity)
            value["city"]+=elemCity[str];
          let description = value["city"] + " - LONG:" + value["longitude"] + "˚LAT:" + value["latitude"] + "˚";          
          let weather = value["temperature"] + "˚C";

          hist.push({date:value["dateRequest"], response:{description,weather}});

          // arr[i] = value["dateRequest"] + " - " + value["city"] + " - LONG:" + value["longitude"] + "˚LAT:" + value["latitude"] + "˚ - " + value["temperature"] + "˚C";
        });

        // hist.sort();
        // hist = Object.keys(hist).sort()
        // hist.reverse();
        
        // arr.sort();
        // arr.reverse();
        
        if (hist !== null) {
          hist.map((item) => {
          console.log(item);
        });
        }

      });
    });
    } catch (error) {
      console.log('Error!');
    }
  };

render () {
    let { isSelected } = this.state
    const { users } = this.state
    return (
      <View style={[ styles.historyContainer,
          { backgroundColor: '#ff4b4b'} ]}>
        <LinearGradient
        colors={['#3b91d6', '#783cb5', '#b23590', '#e23c60', '#ee5843', '#f6702f', '#f9842a', '#fcba53', '#fed77b']}
        start={{x:1, y: 0}}
        end={{x:0, y: 1}} style={styles.linearGradient}>
        <View style={styles.location}>
       
          <ScrollView pointerEvents={"box-none"} style={styles.scrollView}>
          { hist.map((item, key)=>(
          <Text key={key} style={[styles.textStyle]}> { item.date } { item.response.description }</Text>)
          )}
          </ScrollView>

        </View>
        </LinearGradient>
      </View>


    );
  };
}

  const styles = StyleSheet.create({
  historyContainer: {
    zIndex:1,
    height:"100%",
  },
  history: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  linearGradient: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    flex: 1,
    margin: 10
    
  },
  scrollView:{
    marginHorizontal:10,
    marginTop:40,
  },
  
  textStyle:{
    color: '#fff',
    fontSize : 20,
    marginBottom: 10,
    textAlign:'center',
  }, 
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

// export default History;