import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import ProductCard from "../../Component/ProductCard/index"
import {getJSON} from "../../common/fetch"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class ClassifySecond extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
        this.pid = this.props.navigation.getParam("pid")
        this.filter = this.props.navigation.getParam("filter")
        this.from = this.props.navigation.getParam("from")
        this.getItems(this.pid, this.filter)
    }

    getItems(pid, filter) {
        getJSON(`/api/open/products?per_page=1000&page=1&cid=${pid}&k=${filter}`).then(json => {
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
        navigation.navigate(this.from)
    }

    onClickProduct(pid) {
        navigation.navigate("Unity", {
            pid
        })
    }

    onClickSearch(text) {
        this.getItems(0, text)
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar
                    containerStyle={style.searchBarContainer}
                    onClickSearch={this.onClickSearch.bind(this)}
                    onClickBack={this.onClickBack.bind(this)}
                />
                <ScrollView style={{flex: 1}} contentContainerStyle={style.items}>
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
