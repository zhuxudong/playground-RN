import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Image, Text, TouchableOpacity, Platform, StatusBar, Button} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: null,
            name: "App",
            identity: "游客",
            email: "j.tcehjvy@gmail.co",
            tel: "4562-9013424"
        }
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <View style={style.baseInfo}>
                    <View style={style.avatarContainer}>
                        {
                            this.state.avatarUrl ?
                                <Image style={style.avatar} source={{uri: this.state.avatarUrl}}/> :
                                <Image style={style.avatar} source={require("../../../static/img/defaultAvatar.jpg")}/>
                        }
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Text style={style.name}>{this.state.name || "App"}</Text>
                        <Text style={style.subTitle}>{this.state.identity || "游客"}</Text>
                    </View>
                </View>
                <View style={style.item}>
                    <View style={style.itemLeft}>
                        <Image style={style.icon1} source={require("./img/email.png")}/>
                        <Text style={style.subTitle}>邮箱</Text>
                    </View>
                    <Text style={style.subTitle}>{this.state.email}</Text>
                </View>
                <View style={style.item}>
                    <View style={style.itemLeft}>
                        <Image style={style.icon2} source={require("./img/tel.png")}/>
                        <Text style={style.subTitle}>联系方式</Text>
                    </View>
                    <Text style={style.subTitle}>{this.state.tel}</Text>
                </View>
                <View style={style.logout}>
                    <LinearGradient
                        style={style.linearGradient}
                        colors={["#FF9B58", "#F15947"]}
                        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                    >
                    </LinearGradient>
                    <TouchableOpacity style={style.logoutTextContainer} activeOpacity={.9}>
                        <Text style={style.logoutText}>退出登陆</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },
    icon1: {
        marginRight: 13
    },
    icon2: {
        marginLeft: 2,
        marginRight: 15
    },
    baseInfo: {
        height: 50,
        marginBottom: 40,
        flexDirection: "row"
    },
    avatarContainer: {
        width: 50,
        height: 50,
        overflow: "hidden",
        borderRadius: 50,
        marginRight: 20
    },
    avatar: {
        width: 50,
        height: 50
    },
    name: {
        fontSize: 18,
        color: "#4A4A4A"
    },
    subTitle: {
        fontSize: 12,
        color: "#4A4A4A",
        letterSpacing: 2
    },
    item: {
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    logout: {
        position: "absolute",
        bottom: 100,
        width: "100%",
        height: 52,
        backgroundColor: "red",
        borderRadius: 5,
        overflow: "hidden"
    },
    linearGradient: {
        flex: 1
    },
    logoutTextContainer: {
        position: "absolute",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: "bold"
    }
});