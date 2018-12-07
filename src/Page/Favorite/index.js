import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
                title: "Using Banner Stands To Increase Trade Show Traffic",
                subTitle: "Using Banner Stands To Increase Trade Show …",
                price: "99.00"
            }, {
                url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
                title: "Using Banner Stands To Increase Trade Show Traffic",
                subTitle: "Using Banner Stands To Increase Trade Show …",
                price: "99.00"
            }, {
                url: "https://linctex3d.oss-cn-shanghai.aliyuncs.com/Fashion/index/PpMFD727W2UvKfm5dqDefeVP.png",
                title: "Using Banner Stands To Increase Trade Show Traffic",
                subTitle: "Using Banner Stands To Increase Trade Show …",
                price: "99.00"
            }]
        }
    }

    onChangeText(text) {
    }

    onClickClear() {

    }

    onClickCamera() {

    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar containerStyle={style.searchBarContainer} noBack/>
                <ScrollView style={style.scrollView}>
                    {
                        this.state.items.map((item, i) => {
                            let {url, title, subTitle, price} = item;
                            return (
                                <View style={style.card} key={i}>
                                    <View style={style.cardHead}>
                                        <Image style={style.cardHeadImg} source={{uri: url}}/>
                                        <View style={style.cardHeadInfo}>
                                            <Text style={style.cardHeadInfoTitle}>{title}</Text>
                                            <Text style={style.cardHeadInfoSubTitle}>{subTitle}</Text>
                                            <Text style={style.cardHeadInfoPrice}> <Text
                                                style={style.cardHeadInfoPriceSymbol}>￥ </Text> {price}</Text>
                                        </View>
                                    </View>
                                    <View style={style.cardFooterContainer}>
                                        <View style={style.cardDel}>
                                            <Image source={require("./img/remove.png")}/>
                                            <Text style={style.cardDelText}>删除产品</Text>
                                        </View>
                                        <View style={style.cardAddShop}>
                                            <Image source={require("./img/shop.png")}/>
                                            <Text style={style.cardAddShopText}>加入购物车</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>

        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        padding: 10
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#F5F5F5"
    },
    card: {
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        overflow: "hidden",
        elevation: 3
    },
    cardHead: {
        flexDirection: "row",
        padding:10,
    },
    cardHeadImg: {
        width: 90,
        height: 110,
        marginRight: 10,
        resizeMode: "cover"
    },
    cardHeadInfo: {
        flex: 1,
    },
    cardHeadInfoTitle: {
        color: "#4A4A4A",
        fontSize: 12,
    },
    cardHeadInfoSubTitle: {
        color: "#9B9B9B",
        fontSize: 10,
        marginTop: 5
    },
    cardHeadInfoPrice: {
        color: "#D9594C",
        fontSize: 20,
        marginTop: 15
    },
    cardHeadInfoPriceSymbol: {
        color: "#D9594C",
        fontSize: 10
    },
    cardFooterContainer: {
        padding:5,
        flexDirection: "row",
        justifyContent: "center",
        borderTopColor: "#F1F1F1",
        borderTopWidth: 1
    },
    cardDel: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        borderRightColor: "#F1F1F1",
        borderRightWidth: 1
    },
    cardAddShop: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    cardDelText: {
        marginLeft: 5,
        color: "#9B9B9B"
    },
    cardAddShopText: {
        marginLeft: 5,
        color: "#F15947"
    }
});