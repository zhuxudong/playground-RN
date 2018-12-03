import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {getJSON} from "../../common/fetch"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.getItems();

    }

    getItems() {
        getJSON("/api/open/index/dailyRecommend").then(json => {
            this.setState({
                items: json.data
            })
        })
    }

    renderItem({item}) {
        let {date, recommends} = item;
        let month = date.split("-")[1] - 0;
        let day = date.split("-")[2] - 0;
        let today = new Date().getDate()
        return (
            <View style={style.card}>
                {
                    today === day ?
                        <Text style={style.title}>
                            ToDay &nbsp; {day}
                            <Text style={style.subTitle}>&nbsp;&nbsp;&nbsp;推荐</Text>
                        </Text> :
                        <Text style={style.subTitle}>{month}月{day}日推荐</Text>
                }
                {
                    recommends.map((recommend, i) => {
                        return (
                            <View style={style.cardBody} key={i}>
                                <Image style={style.img}
                                       source={{uri: recommend.thumbPath}}/>
                                <Text
                                    style={style.content}>{recommend.description}>
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    keyExtractor(item) {
        return item.date
    }

    render() {
        return (
            <FlatList style={{...style.container, ...this.props.containerStyle}}
                      data={this.state.items}
                      keyExtractor={this.keyExtractor}
                      renderItem={this.renderItem.bind(this)}
            >
            </FlatList>
        );
    }
}

let style = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        color: "#36393D",
        marginBottom: 10
    },
    subTitle: {
        color: "#36393D",
        fontSize: 12,
        marginBottom: 10,
        letterSpacing: 1
    },
    cardBody: {
        marginBottom: 20
    },
    img: {
        height: 170,
        borderRadius: 10,
        resizeMode: "cover"
    },
    content: {
        marginTop: 6,
        letterSpacing: 1,
        lineHeight: 24,
        color: "#4A4A4A",
        fontSize: 14
    }
})