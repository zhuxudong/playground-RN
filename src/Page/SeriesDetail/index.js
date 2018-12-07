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

    onClickProduct(pid) {
        navigation.navigate("Unity", {
            pid
        })
    }

    render() {
        let data = this.props.navigation.getParam("data", {})
        let {name, description, thumbPath, products} = data
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <View style={style.head}>
                    <TouchableOpacity style={style.back}
                                      onPress={this.onClickBack.bind(this)}
                    >
                        <Image style={style.backIcon} source={require("./img/back.png")}/>
                    </TouchableOpacity>
                    <Text style={style.headText}>{name}</Text>
                </View>
                <ScrollView style={style.scrollView}>
                    <Image style={style.bannerImage} source={{uri: thumbPath}}/>
                    <Text style={style.description}>
                        {description}
                    </Text>
                    <View style={style.productTextContainer}>
                        <Text style={style.productText}>系列产品</Text>
                        <View style={style.underline}/>
                    </View>
                    <ScrollView style={{flex: 1}} contentContainerStyle={style.items}>
                        {
                            products.map((product, i) => {
                                return (
                                    <ProductCard key={i}
                                                 url={product.thumbPath}
                                                 title={product.name}
                                                 priceSymbol={product.priceSymbol}
                                                 price={product.price}
                                                 onPress={this.onClickProduct.bind(this, product.id)}
                                    />
                                )
                            })
                        }
                    </ScrollView>
                </ScrollView>
            </View>


        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        paddingTop: 5,
        paddingBottom: 5,
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
        marginRight: 20,
        alignItems: "center"
    },
    backIcon: {
        flex: 1,
        resizeMode: "contain"
    },
    scrollView: {
        flex: 1
    },
    bannerImage: {
        height: 200,
        resizeMode: "cover",
    },
    description: {
        color: "#4A4A4A",
        padding: 10,
        fontSize: 14,
        letterSpacing: 1,
        lineHeight: 24,
    },
    productTextContainer: {
        alignItems:"center",
        flex: 0,
        margin:20
    },
    productText: {
        fontSize: 14,
        color: "#4A4A4A",
    },
    underline: {
        marginTop:10,
        width: 39,
        height: 2,
        backgroundColor: "#4A4A4A",
    },
    items: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
    }
});