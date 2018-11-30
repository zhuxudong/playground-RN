import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {getJSON} from "../../common/fetch"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Recommend extends Component {
    constructor(props) {
        super(props);
        getJSON("/api/front/index/getIndexThumbs").then(json => {
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <View style={style.card}>
                    <Text style={style.title}>
                        ToDay &nbsp; {21}
                        <Text style={style.subTitle}>&nbsp;&nbsp;&nbsp;推荐</Text>
                    </Text>
                    <Image style={style.img}
                           source={{uri: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png"}}/>
                    <Text
                        style={style.content}>{"橘滋 (Juicy Couture) 推出全新的假日系列，整个系列充满着饱满的热情与奢华感。本系列的设计灵感源自欢乐的假期，设计师运用闪烁元素、华丽的印花图案与颜色组合，丰富整个系列。"}</Text>
                </View>
                <View style={style.card}>
                    <Text style={style.title}>
                        ToDay &nbsp; {10}
                        <Text style={style.subTitle}>&nbsp;&nbsp;&nbsp;推荐</Text>
                    </Text>
                    <Image style={style.img}
                           source={{uri: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png"}}/>
                    <Text
                        style={style.content}>{"橘滋 (Juicy Couture) 推出全新的假日系列，整个系列充满着饱满的热情与奢华感。本系列的设计灵感源自欢乐的假期，设计师运用闪烁元素、华丽的印花图案与颜色组合，丰富整个系列。"}</Text>
                </View>
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        padding: 10
    },
    card: {
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        color: "#36393D",
        marginBottom: 5
    },
    img: {
        height: 170,
        borderRadius: 10
    },
    content: {
        marginTop: 6,
        letterSpacing: 1,
        lineHeight: 24,
        color: "#4A4A4A",
        fontSize: 14
    }
})