import React from 'react';
import {View, Platform, StatusBar, StyleSheet} from 'react-native';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import navigationService from './navigationService';
import Home from "../Page/Home/index"
import Classify from "../Page/Classify/index"
import ClassifySecond from "../Page/ClassifySecond/index"
import Favorite from "../Page/Favorite/index"
import My from "../Page/My/index"
import Search from "../Page/Search/index"
import SeriesDetail from "../Page/SeriesDetail/index"
import NavBottom from "../Component/NavBottom/index"
import Unity from "../Page/Unity/index"
import Login from "../Page/Login/index"

const SwitchNavigator = createSwitchNavigator({
    Classify,
    Favorite,
    My,
})
const AppNavigator = createSwitchNavigator({
    Home,
    Classify,
    Favorite,
    My,
    Unity,
    ClassifySecond,
    Login,
    Search,
    SeriesDetail,
}, {
    headerMode: "none",
    initialRouteName: "Home",
    tabBarComponent: NavBottom,
    defaultNavigationOptions: ({navigation}) => ({
        tabBarVisible: ["Search", "Unity"].indexOf(navigation.state.routeName) === -1
    })
});
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={style.container}>
                <StatusBar hidden={false}
                           translucent
                           barStyle={"dark-content"}
                />
                <AppContainer ref={navigatorRef => {
                    navigationService.setTopLevelNavigator(navigatorRef);
                }}
                />
                {
                    <NavBottom ref={ref => {
                        navigationService.setNavBottom(ref)
                    }}/>
                }
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
            },
            android: {
                paddingTop: StatusBar.currentHeight
            },
        })
    }
})

export default App
