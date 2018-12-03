import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import navigationService from './navigationService';
import Home from "../Page/Home/index"
import Classify from "../Page/Classify/index"
import ClassifySecond from "../Page/ClassifySecond/index"
import Favorite from "../Page/Favorite/index"
import My from "../Page/My/index"
import Search from "../Page/Search/index"
import SeriesDetail from "../Page/SeriesDetail/index"
import NavBottom from "../Component/NavBottom/index"

const AppNavigator = createBottomTabNavigator({
    Home: (props) => (<Home {...props} containerStyle={style.haveTop}/>),
    Classify: (props) => (<Classify {...props} containerStyle={style.haveTop}/>),
    ClassifySecond: (props) => (<ClassifySecond {...props} containerStyle={style.haveTop}/>),
    Favorite: (props) => (<Favorite {...props} containerStyle={style.haveTop}/>),
    My: (props) => (<My {...props} containerStyle={style.haveTop}/>),
    Search: (props) => (<Search {...props} containerStyle={style.haveTop}/>),
    SeriesDetail: (props) => (<SeriesDetail {...props} containerStyle={style.haveTop}/>),
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
                marginTop: StatusBar.currentHeight
            },
        })
    }
})

export default App
