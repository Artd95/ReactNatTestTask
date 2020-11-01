import React from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Tabsbar from './components/Tabsbar'


const KEY = '2fe49fddc008c48c139c895117a07bee'

export default class App extends React.Component {

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    city: null,
    country: null,
    dateRequest: null,
    longitude: null,
    latitude: null,
    error: null,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Retriving Weather Conditions'
        });
      }
    );
  }


  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${KEY}&units=metric`
    )
    .then(res => res.json())
    .then(data => {
      var today = new Date();
      if (parseInt(String(today.getMinutes()))<10){
        var dateRequest = String(today.getHours()) + ":0" + String(today.getMinutes()) + " " + String(today.getFullYear()) + "-" + String(today.getMonth()) + "-" + String(today.getDate());
      } else {
        var dateRequest = String(today.getHours()) + ":" + String(today.getMinutes()) + " " + String(today.getFullYear()) + "-" + String(today.getMonth()) + "-" + String(today.getDate());
      }
        this.setState({
        temperature: data.main.temp,
        weatherCondition: data.weather[0].main,
        city: data.name,
        dateRequest:dateRequest,
        country: data.sys.country,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        isLoading: false,
        });
      // AsyncStorage.clear();
      AsyncStorage.setItem(today, JSON.stringify(this.state)) ;
      // const history = AsyncStorage.getItem('@history');
      // console.log (history);
      // AsyncStorage.getItem('history').then(elem => {
      // elem = elem == null ? [] : JSON.parse(elem)
      // elem.push(this.state)
      // return AsyncStorage.setItem('history', JSON.stringify(elem))
      // });
      // console.log(AsyncStorage.getItem('history'));
      
    });
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
  };
  }

  render() {
    const { isLoading, weatherCondition, temperature, city, country, longitude, latitude, location, humidity } = this.state
    return (
      <View style={styles.container}>
      {isLoading ? (
        <LinearGradient
        colors={['#3b91d6', '#783cb5', '#b23590', '#e23c60', '#ee5843', '#f6702f', '#f9842a', '#fcba53', '#fed77b']}
        start={{x:1, y: 0}}
        end={{x:0, y: 1}} style={styles.linearGradient}>
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Fetching Your Weather</Text> 
        </View>
        </LinearGradient>
        ) : (
        <Tabsbar weather={this.state.weatherCondition} temperature={Math.round(this.state.temperature)} 
          city={city} country={country} longitude={longitude} latitude={latitude} location={location} humidity={humidity}/>
        )}
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    paddingTop:10,
    fontSize: 20,
    color: '#fff',
  }
});