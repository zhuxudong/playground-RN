import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: ["女装", "卫衣", "男装", "Juicy Couture", "羽绒", "西装"]
        }
    }

    onChangeText(text) {
    }

    onClickClear() {

    }

    onClickBack() {
        navigation.navigate("Home", {
            fromSearch: true
        })
    }

    onClickCamera() {

    }

    render() {
        return (
            <ScrollView style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar
                    onClickBack={this.onClickBack.bind(this)}
                />
                <View style={style.history}>
                    <Text style={style.historyTitle}>历史搜索</Text>
                    <View style={style.cardContainer}>
                        {
                            this.state.cards.map((card, i) => (
                                <View style={style.card} key={i}>
                                    <Text style={style.cardText}>{card}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    history: {
        marginTop: 17,
        paddingLeft: 10,
        paddingRight: 10,
    },
    historyTitle: {
        fontSize: 12,
        color: "#4A4A4A",
        marginBottom: 25,
        letterSpacing: 1,
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-evenly"
    },
    card: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#CDCDCD",
        marginBottom: 15,
        marginRight: 20
    },
    cardText: {
        color: "#9B9B9B",
        fontSize: 12
    }
});