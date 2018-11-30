import React, {Component} from 'react';
import {View, Text, Input, ScrollView, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'
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
        console.log(text)
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
                <View style={style.head}>
                    <TouchableOpacity
                        style={style.back}
                        onPress={this.onClickBack.bind(this)}
                    >
                        <Image source={require("./img/back.png")}/>
                    </TouchableOpacity>
                    <SearchBar
                        round
                        onChangeText={this.onChangeText.bind(this)}
                        onClear={this.onClickClear.bind(this)}
                        placeholder='搜索'
                        placeholderTextColor={"#CDCDCD"}
                        containerStyle={style.searchBarContainer}
                        inputContainerStyle={style.inputContainerStyle}
                        inputStyle={style.inputStyle}
                    />
                    <TouchableOpacity
                        style={style.camera}
                        onPress={this.onClickCamera.bind(this)}
                    >
                        <Image source={require("./img/camera.png")}/>
                    </TouchableOpacity>
                </View>
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
    head: {
        flexDirection: "row",
        alignItems: "center"
    },
    back: {
        marginRight: 15
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
    },
    inputContainerStyle: {
        overflow: "visible",
        backgroundColor: "transparent",
    },
    inputStyle: {
        fontSize: 14,
        color: "#000"
    },
    camera: {
        marginLeft: 15,
        marginRight: 20
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