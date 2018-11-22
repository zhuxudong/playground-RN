import React, {Component} from 'react';
import {View} from 'react-native';
import Banner from "./Banner"
import NavTop from "./NavTop"
import ProductNew from "./ProductNew"

export default class HelloWorldApp extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <NavTop></NavTop>
                <Banner></Banner>
                <ProductNew></ProductNew>
            </View>
        );
    }
}