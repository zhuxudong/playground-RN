import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @param {object} containerStyle - 容器样式
 * @param {string} title - 正标题
 * @param {string} subTitle - 副标题
 * @param {array} imgs - 图片uris ["http://...jpg","http://....png"]
 * */
export default class FashionCard extends Component {
    static defaultProps = {
        imgs: [
            "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
            "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png"
        ]
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <LinearGradient
                    style={style.cardHead}
                    locations={[0, 0.36, .36, 0.62, .62, .87, .87]}
                    colors={["#A4B8C8", "#A4B8C8", "#9AAABA", "#9AAABA", "#F7F5F2", "#F7F5F2", "#303458"]}
                    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                >
                </LinearGradient>
                <View style={style.cardBody}>
                    <Text style={style.cardTitle}>{this.props.title}</Text>
                    <Text style={style.cardSubTitle}>{this.props.subTitle}</Text>
                    <View style={style.imgContainer}>
                        {this.props.imgs.map((url, i) => {
                            return (
                                <Image style={style.img} key={i} source={{uri: url}}></Image>
                            )
                        })}
                    </View>
                </View>

            </View>
        )
    }
}

let style = StyleSheet.create({
    container: {
        width: 330,
        marginRight: 15
    },
    cardHead: {
        height: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardBody: {
        padding: 5,
        paddingBottom: 22,
        flex: 1
    },
    cardTitle: {
        fontSize: 18,
        color: "#36393D",
        marginTop: 5,
    },
    cardSubTitle: {
        fontSize: 12,
        color: "#4A4A4A",
        marginBottom: 10
    },
    imgContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flex: 1
    },
    img: {
        flex: 1,
        marginRight: 6,
        resizeMode: "cover"
    }
})