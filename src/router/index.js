import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import navigationService from './navigationService';
import Home from "../Component/Home/index"
import ClassifySecond from "../Component/ClassifySecond/index"
import SeriesDetail from "../Component/SeriesDetail/index"
import Favorite from "../Component/Favorite/index"
import My from "../Component/My/index"
import Search from "../Component/Search/index"
import NavBottom from "../Component/NavBottom/index"

const AppNavigator = createBottomTabNavigator({
  Home: () => (<Home containerStyle={style.haveTop}/>),
  ClassifySecond: () => (<ClassifySecond containerStyle={style.haveTop}/>),
  Favorite: () => (<Favorite containerStyle={style.haveTop}/>),
  My: () => (<My containerStyle={style.haveTop}/>),
  Search: () => (<Search containerStyle={style.haveTop}/>),
  SeriesDetail: () => (<SeriesDetail containerStyle={style.haveTop}/>),
}, {
  initialRouteName: "Home",
  tabBarComponent: NavBottom,
  defaultNavigationOptions: ({navigation}) => ({
    tabBarVisible: navigation.state.routeName !== "Search"
  })
});
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <AppContainer ref={navigatorRef => {
        navigationService.setTopLevelNavigator(navigatorRef);
      }}
      />
    );
  }
}

const style = StyleSheet.create({
  haveTop: {
    ...Platform.select({
      ios: {
        // backgroundColor: 'red',
      },
      android: {
        marginTop: StatusBar.currentHeight,
      },
    })
  }
})
export default App
