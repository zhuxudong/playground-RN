import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Image, Text, TouchableOpacity, Platform, StatusBar, Button} from 'react-native';
import ProductCard from "../../Component/ProductCard/index"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class SeriesDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onClickBack() {
        navigation.navigate("Home")
    }

    render() {
        let data = this.props.navigation.getParam("data", {})
        let {name, description, thumbPath, products} = data
        return (
            <ScrollView style={{...style.container, ...this.props.containerStyle}}>
                <View style={style.head}>
                    <TouchableOpacity style={style.back}
                                      onPress={this.onClickBack.bind(this)}
                    >
                        <Image style={style.backIcon} source={require("./img/back.png")}/>
                    </TouchableOpacity>
                    <Text style={style.headText}>{name}</Text>
                </View>
                <Image style={style.bannerImage} source={{uri: thumbPath}}/>
                <Text style={style.productText}>系列产品</Text>
                <View style={style.items}>
                    {
                        products.map((product, i) => {
                            return (
                                <ProductCard key={i}
                                             url={product.thumbPath}
                                             title={product.name}
                                             priceSymbol={product.priceSymbol}
                                             price={product.price}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flexDirection: "row",
        backgroundColor: "#000",
        alignItems: "center"
    },
    headText: {
        color: "#fff",
        fontSize: 14
    },
    back: {
        width: 35,
        height: 30,
        alignItems: "center"
    },
    backIcon: {
        flex: 1,
        resizeMode: "contain"
    },
    bannerImage: {
        height: 200,
        resizeMode: "cover",
    },
    productText: {
        color: "#4A4A4A",
        fontSize: 14,
        alignSelf: "center",
        marginTop: 30,
        marginBottom: 20
    },
    items: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }
});