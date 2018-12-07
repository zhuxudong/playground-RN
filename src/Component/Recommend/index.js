import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import {getJSON} from "../../common/fetch"
import navigation from "../../router/navigationService"

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
        getJSON("/api/open/index/dailyRecommend?is_daily=1").then(json => {
            this.setState({
                items: json.data
            })
        })
    }

    onClickRecommend(pid) {
        navigation.navigate("Unity", {
            pid
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
                                <TouchableOpacity
                                    onPress={this.onClickRecommend.bind(this, recommend.id)}
                                >
                                    <Image style={style.img}
                                           source={{uri: recommend.thumbPath}}/>
                                </TouchableOpacity>
                                <Text
                                    style={style.content}>{recommend.description}>
                                </Text>
                            </View>
                        )
                    })
                }
                <View style={style.headLine}></View>
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
        paddingLeft: 10,
        paddingRight: 10,
    },
    card: {
        marginBottom: 30,
    },
    headLine: {
        height: 1,
        backgroundColor: "#F1F1F1",
        marginTop: 10,
        marginBottom: 10
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