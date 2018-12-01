import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [{
        url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
        title: "15 Tips To Increase Your Adwords..",
        priceSymbol: "$",
        price: "99.00"
      }, {
        url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
        title: "15 Tips To Increase Your Adwords..",
        priceSymbol: "$",
        price: "99.00"
      }, {
        url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
        title: "15 Tips To Increase Your Adwords..",
        priceSymbol: "$",
        price: "99.00"
      }, {
        url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
        title: "15 Tips To Increase Your Adwords..",
        priceSymbol: "$",
        price: "99.00"
      }]

    }
  }

  render() {
    return (
      <ScrollView style={{...style.container, ...this.props.containerStyle}} contentContainerStyle={style.items}>
        {this.state.items.map((item, index) => {
          return (
            <View key={index} style={style.item}>
              <Image style={style.img} source={{uri: item.url}}/>
              <Text style={style.text}>{item.title}</Text>
              <Text style={style.price}>{item.priceSymbol}{item.price}</Text>
            </View>
          )
        })}
      </ScrollView>
    )

  }
}

let style = StyleSheet.create({
  container: {
    flex: 1
  },
  items: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  item: {
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 10,
    width: "40%"
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: 220
  },
  text: {
    color: "#4A4A4A",
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 10
  },
  price: {
    color: "#F15947",
    fontSize: 12,
    marginTop: 2
  }
})
