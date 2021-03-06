import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

/** 产品卡片
 * @param {object} containerStyle - 容器样式
 * @param {string} url - 商品图片url
 * @param {string} title - 商品名字
 * @param {string} priceSymbol - 价格符号
 * @param {string} price - 价格
 * @param {function} onPress - 点击触发的事件
 * */
export default class ProductCard extends Component {
    constructor(props) {
        super(props)
    }

    onPress() {
        if (typeof this.props.onPress === "function") {
            this.props.onPress()
        }
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
                    <Image style={style.img} source={{uri: this.props.url}}/>
                </TouchableOpacity>
                <Text style={style.text}>{this.props.title}</Text>
                <Text style={style.price}>{this.props.priceSymbol}{this.props.price}</Text>
            </View>
        )

    }
}

let style = StyleSheet.create({
    container: {
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: 15,
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
