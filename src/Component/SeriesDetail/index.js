import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ClassifySecond from "../ClassifySecond/index"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class SeriesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ["女装", "卫衣", "男装", "Juicy Couture", "羽绒", "西装"]
    }
  }

  render() {
    return (
      <ScrollView style={{...style.container, ...this.props.containerStyle}}>
        <ClassifySecond/>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
});