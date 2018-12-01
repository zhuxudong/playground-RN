import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import UnityView from "../../react-native-unity-view/out/index";
import Banner from "../Banner/index"
import Fashion from "../Fashion/index"
import Recommend from "../Recommend/index"
/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Index extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={{...style.container, ...this.props.containerStyle}}>
                <Banner></Banner>
                <Fashion></Fashion>
                <Recommend></Recommend>
            </ScrollView>
        )

    }
}

let style = StyleSheet.create({
    container: {
        flex: 1
    }
})
