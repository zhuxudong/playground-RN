import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @param {object} containerStyle - 容器样式
 * @param {string} title - 正标题
 * @param {string} subTitle - 副标题
 * @param {array} imgs - 图片uris ["http://...jpg","http://....png"]
 * @param {array} colors - [{color:"#ffffff",percent:.5}]
 * @param {function} onPress - 点击事件
 * */
export default class FashionCard extends Component {
    static defaultProps = {
        imgs: [
            // "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
        ],
        colors: []
    }

    constructor(props) {
        super(props);
    }

    getLocations(colors) {
        let locations = [0]
        colors.map((color) => color.percent).reduce((prev, now) => {
            locations.push(prev, prev)
            return prev + now
        })
        return locations
    }

    getColors(colors) {
        let c = []
        colors.forEach((color, i) => {
            if (i === colors.length - 1) {
                c.push(color.color)
            } else {
                c.push(color.color, color.color)
            }
        })
        return c
    }

    onPress() {
        if (typeof this.props.onPress === "function") {
            this.props.onPress()
        }
    }

    render() {
        return (
            <TouchableOpacity style={{...style.container, ...this.props.containerStyle}}
                              onPress={this.onPress.bind(this)}>
                <View style={style.card}>
                    <LinearGradient
                        style={style.cardHead}
                        locations={this.getLocations(this.props.colors)}
                        colors={this.getColors(this.props.colors)}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                    </LinearGradient>
                    <View style={style.cardBody}>
                        <Text style={style.cardTitle}>{this.props.title}</Text>
                        <Text style={style.cardSubTitle}>{this.props.subTitle}</Text>
                        <View style={style.imgContainer}>
                            {this.props.imgs.map((url, i) => {
                                return (
                                    <Image style={style.img} key={i} source={{uri: url}}/>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

let style = StyleSheet.create({
    container: {
        width: 330,
        marginRight: 20
    },
    card: {
        flex: 1
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