import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import ProductCard from "../../Component/ProductCard/index"
import {getJSON} from "../../common/fetch"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []

        }
        this.getItems();
    }

    getItems() {
        let pid = this.props.navigation.getParam("pid")
        getJSON(`/api/open/products?per_page=1000&page=1&cid=${pid}`).then(json => {
            this.setState({
                items: json.data.data.map((item) => ({
                    url: item.thumbPath,
                    title: item.name,
                    priceSymbol: item.priceSymbol,
                    price: item.price,
                    pid: item.id
                }))
            })
        })
    }

    onClickBack() {
        navigation.navigate("Classify")
    }

    onClickProduct(pid) {
        navigation.navigate("Unity", {
            pid
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar
                    containerStyle={style.searchBarContainer}
                    onClickBack={this.onClickBack.bind(this)}
                />
                <ScrollView style={{flex:1}} contentContainerStyle={style.items}>
                    {this.state.items.map((item, index) => {
                        return (
                            <ProductCard key={index}
                                         url={item.url}
                                         title={item.title}
                                         priceSymbol={item.priceSymbol}
                                         price={item.price}
                                         onPress={this.onClickProduct.bind(this, item.pid)}
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
    searchBarContainer: {
        padding: 10,
    },
    items: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }
})
