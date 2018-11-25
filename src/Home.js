import React, {Component} from 'react';
import {Button, View, Alert} from 'react-native';
import Banner from "./Component/Banner"
import NavTop from "./Component/NavTop"
import ProductNew from "./Component/ProductNew"
import UnityView from "./react-native-unity-view/out/index"

export default class HelloWorldApp extends Component {
    constructor(props) {
        super(props)
    }

    onMessage(message) {
        console.log(message)
        Alert.alert(message)
    }

    postMessage(message) {
        if (this.unity) {
            this.unity.postMessageToUnityManager(message)
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavTop></NavTop>
                <UnityView style={{flex: 1}} ref={(ref) => this.unity = ref}
                           onMessage={this.onMessage.bind(this)}
                ></UnityView>
            </View>
        );
    }
}