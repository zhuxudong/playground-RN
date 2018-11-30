import React, {Component} from 'react';
import {View, ScrollView,StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Classify extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView style={{...style.container, ...this.props.containerStyle}}>
                <Text>分类</Text>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});