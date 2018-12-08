import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import navigation from "../../router/navigationService"
import storage from "../../config/storage"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: {}
        }
        this.getHistory()
    }

    getHistory() {
        AsyncStorage.getItem(storage.homeSearchHistory).then((data) => {
            if (data) {
                this.setState({
                    cards: JSON.parse(data)
                })
            } else {
                this.setState({
                    cards: {}
                })
            }
        })
    }

    onChangeText(text) {
    }

    onClickSearch(text) {
        if (text) {
            let cards = this.state.cards;
            cards[text] = true
            this.setState({
                cards
            })
            this.go(text)
        }
    }

    go(text) {
        navigation.navigate("ClassifySecond", {
            filter: text,
            from: "Search"
        })
    }

    componentWillUnmount() {
        AsyncStorage.setItem(storage.homeSearchHistory, JSON.stringify(this.state.cards))
    }

    onClickClear() {

    }

    onClickClearHistory() {
        AsyncStorage.removeItem(storage.homeSearchHistory).then(this.getHistory.bind(this))
    }

    onClickBack() {
        navigation.navigate("Home")
    }

    onClickCamera() {

    }

    renderItem() {
        let cards = [];
        for (let cardName in this.state.cards) {
            cards.push(cardName)
        }
        if (cards.length) {
            return cards.map((card, i) => (
                <TouchableOpacity style={style.card} key={i} onPress={this.go.bind(this, card)}>
                    <Text style={style.cardText}>{card}</Text>
                </TouchableOpacity>
            ))
        } else {
            return (
                <Text style={style.noDataText}>暂无历史记录，去搜索试试吧!</Text>
            )
        }

    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar
                    containerStyle={style.searchBarContainer}
                    onClickBack={this.onClickBack.bind(this)}
                    onClickSearch={this.onClickSearch.bind(this)}
                />
                <ScrollView style={{flex: 1}}>
                    <View style={style.history}>
                        <View style={style.historyTitleContainer}>
                            <Text style={style.historyTitle}>历史搜索</Text>
                            <TouchableOpacity style={style.trashContainer}
                                              onPress={this.onClickClearHistory.bind(this)}
                            >
                                <Text style={style.trashText}>清空</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.cardContainer}>
                            {
                                this.renderItem.bind(this)()
                            }
                        </View>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    searchBarContainer: {
        padding: 10,
        backgroundColor: "#fff"
    },
    history: {
        marginTop: 17,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 30,
        backgroundColor: "#fff",
        borderRadius: 5
    },
    historyTitleContainer: {
        padding: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    historyTitle: {
        color: "#4A4A4A",
        letterSpacing: 1,
        fontSize: 12,
    },
    trashContainer: {
        flexDirection: "row"
    },
    trashText: {
        fontSize: 12,
        color: "#9B9B9B"
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
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
    },
    noDataText: {
        flex: 1,
        paddingTop: 100,
        paddingBottom: 100,
        textAlign: "center",
        color: "#9B9B9B",
        fontSize: 12,
        letterSpacing: 1
    }
});