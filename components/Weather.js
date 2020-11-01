import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ weather, temperature, city, country, longitude, latitude }) => {
    return (

      <View style={[ styles.weatherContainer,
          { backgroundColor: weatherConditions[weather].color } ]}>
        <ImageBackground source={weatherConditions[weather].bk_image} style={styles.background}>
        <View style={styles.location}>
          <Text style={styles.title}>{city}, {country}</Text>
          <Text style={styles.subtitle}>LONG:{longitude}˚LAT:{latitude}˚</Text>
        </View>
        <View style={styles.weather}>
          <MaterialCommunityIcons size={85}
            name={weatherConditions[weather].icon}
            color={'#fff'}/>
          <Text style={styles.tempText}>{temperature}˚</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>{weatherConditions[weather].title}</Text>
          <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}
          </Text>
        </View>
        </ImageBackground>
      </View>
    );
  };

  Weather.propTypes = {
    temperature: PropTypes.number.isRequired,
    weather: PropTypes.string
  };
  
  const styles = StyleSheet.create({
  weatherContainer: {
    zIndex:1,
    height:"100%",
  },
  weather: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  location: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginTop: 70,
  },
  tempText: {
    fontSize: 80,
    color: '#fff',
  },
  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  background: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  }
});

export default Weather;