import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import navigation from "../../router/navigationService"
import {getJSON, getJSONWithToken, checkLogin, logout} from "../../common/fetch"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class My extends Component {
    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: null,
            name: "",
            identity: "",
            email: "",
            tel: "",
            loginSuccess: false
        }
        this.checkLogin()
    }

    checkLogin() {
        checkLogin().then((loginSuccess) => {
            if (loginSuccess) {
                this.setState({
                    loginSuccess: true
                })
                this.refreshUserInfo();
            } else {
                navigation.navigate("Login", {
                    fromRouterName: "My"
                });
                // this.setState({
                //     name: "App",
                //     identity: "游客"
                // })
            }
        })
    }

    refreshUserInfo() {
        getJSONWithToken("/api/open/user/info").then(({data}) => {
            this.setState({
                avatarUrl: data.avatarPath,
                name: data.name,
                identity: data.reCategory,
                email: data.email,
                tel: data.tel,
            })
        })
    }

    onClickLogout() {
        logout().then(() => {
            navigation.navigate("Home")
        })
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
                        <Text style={style.name}>{this.state.name}</Text>
                        <Text style={style.subTitle}>{this.state.identity}</Text>
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
                {
                    this.state.loginSuccess &&
                    <TouchableOpacity style={style.logoutContainer} onPress={this.onClickLogout.bind(this)}>
                        <View style={style.logout}>
                            <LinearGradient
                                style={style.linearGradient}
                                colors={["#FF9B58", "#F15947"]}
                                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            >
                            </LinearGradient>
                            <Text style={style.logoutText}>退出登陆</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon1: {
        marginRight: 13
    },
    icon2: {
        marginLeft: 2,
        marginRight: 15
    },
    baseInfo: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: "row",
        borderBottomWidth: 5,
        borderBottomColor: "#F1F1F1"
    },
    avatarContainer: {
        width: 50,
        height: 50,
        overflow: "hidden",
        borderRadius: 50,
        marginRight: 20,
        marginLeft: 10
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
        letterSpacing: 2,
        paddingRight: 10,
    },
    item: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F2F3F4"
    },
    itemLeft: {
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    logoutContainer: {
        position: "absolute",
        bottom: 100,
        width: "90%",
        left: "5%",
        height: 52,
        backgroundColor: "red",
        borderRadius: 5,
        overflow: "hidden"
    },
    logout: {
        flex: 1
    },
    linearGradient: {
        flex: 1
    },
    logoutText: {
        position: "absolute",
        textAlign: "center",
        lineHeight: 52,
        width: "100%",
        height: "100%",
        color: "#fff",
        fontSize: 14,
        letterSpacing: 2,
        fontWeight: "bold"
    }
});