import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Tab, TabView } from 'react-native-easy-tabs'
import Weather from './Weather'
import History from './History'


TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

export default function Screens({ weather, temperature, city, country, longitude, latitude }) {

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View  style={{flex:1}}>
      <View style={styles.screenContainer}>
        <AppButton title="Weather today" onPress={() => setCurrentTab(0)} />
        <AppButton title="History" onPress={() => setCurrentTab(1)} />
      </View>

      <TabView selectedTabIndex={currentTab}> 
        <Tab>
          <View>
            <Weather weather={weather} temperature={temperature} 
              city={city} country={country} longitude={longitude} latitude={latitude}/>
          </View>
        </Tab>

        <Tab lazy>
          <View >
              <History/>
          </View>
        </Tab>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    position:'relative',
    flexDirection: "row",
    bottom:-35,
    zIndex:2,
  },
  appButtonContainer: {
    width:'50%',
    backgroundColor: "#rgba(0, 0, 0, 0.3)",
    paddingVertical: 5,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});