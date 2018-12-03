import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import ProductCard from "../../Component/ProductCard/index"

import navigation from "../../router/navigationService"

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

    onClickBack() {
        navigation.navigate("Classify")
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar
                    onClickBack={this.onClickBack.bind(this)}
                />
                <ScrollView contentContainerStyle={style.items}>
                    {this.state.items.map((item, index) => {
                        return (
                            <ProductCard key={index}
                                         url={item.url}
                                         title={item.title}
                                         priceSymbol={item.priceSymbol}
                                         price={item.price}
                            />
                        )
                    })}
                </ScrollView>
            </View>
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
    }
})
