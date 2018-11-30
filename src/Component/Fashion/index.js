import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {getJSON} from "../../common/fetch"
import FashionCard from "../FashionCard/index"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Fashion extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        getJSON("/api/front/index/getIndexThumbs").then(json => {
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <Text style={style.title}>流行趋势</Text>
                <ScrollView horizontal style={style.scrollView}>
                    <FashionCard
                        title={"经典法式格调"}
                        subTitle={"伊莎贝尔·玛兰 (Isabel Marant) 2012019春夏女装…"}
                    ></FashionCard>
                    <FashionCard
                        title={"十足的衣架魅力"}
                        subTitle={"Y/Project 2019春夏女装秀，海报带你回顾2019春夏巴黎时..."}
                    ></FashionCard>
                </ScrollView>
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        marginTop: 40,
        marginBottom: 40,
        padding: 10
    },
    title: {
        fontSize: 22,
        color: "#36393D",
        marginBottom: 20
    },
    scrollView: {
        height: 215,
        flexDirection: "row"
    },
})