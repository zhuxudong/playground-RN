import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import UnityView from "../../react-native-unity-view/out/index";
import Banner from "../../Component/Banner/index"
import Fashion from "../../Component/Fashion/index"
import Recommend from "../../Component/Recommend/index"

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
                <Banner/>
                <Fashion/>
                <Recommend/>
            </ScrollView>
        )

    }
}

let style = StyleSheet.create({
    container: {
        flex: 1
    }
})
