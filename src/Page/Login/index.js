import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, TextInput, AsyncStorage, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import navigation from "../../router/navigationService"
import {login} from "../../common/fetch"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Login extends Component {
    fromRouterName = "Home"

    constructor(props) {
        super(props)
        this.state = {
            account: "",
            password: ""
        }
    }

    componentDidMount() {
        this.fromRouterName = this.props.navigation.getParam("fromRouterName")
    }

    onClickLogin() {
        let {account, password} = this.state;
        login(account, password).then(() => {
            navigation.navigate(this.fromRouterName)
        }).catch(() => {
            Alert.alert("账号密码错误")
        })
    }

    onClickClose() {
        // navigation.navigate(this.fromRouterName)
        navigation.navigate("Home")
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <TouchableOpacity style={style.closeContainer} onPress={this.onClickClose.bind(this)}>
                    <Image source={require("./img/close.png")}/>
                </TouchableOpacity>
                <Text style={style.loginText}>登陆</Text>
                <View style={style.item}>
                    <Text style={style.itemName}>账号：</Text>
                    <TextInput style={style.textInput}
                               placeholder={"请输入账号"}
                               placeholderTextColor={"#ffffff99"}
                               value={this.state.account}
                               onChangeText={(text) => this.setState({account: text})}
                    />
                </View>
                <View style={style.item}>
                    <Text style={style.itemName}>密码：</Text>
                    <TextInput style={style.textInput}
                               placeholder={"请输入密码"}
                               placeholderTextColor={"#ffffff99"}
                               value={this.state.password}
                               onChangeText={(text) => this.setState({password: text})}
                    />
                </View>
                <TouchableOpacity style={style.loginContainer} onPress={this.onClickLogin.bind(this)}>
                    <View style={style.login}>
                        <LinearGradient
                            style={style.linearGradient}
                            colors={["#FF9B58", "#F15947"]}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                        >
                        </LinearGradient>
                        <Text style={style.loginBtnText}>登陆</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}

let style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6B6D72",
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    closeContainer: {
        width: 30,
        height: 30,
    },
    loginText: {
        fontSize: 28,
        color: "#fff",
        marginTop: 20,
        marginBottom: 49,
        letterSpacing: 1
    },
    item: {
        marginBottom: 20,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    itemName: {
        width: 50,
        marginRight: 10,
        color: "#fff",
        fontSize: 14
    },
    textInput: {
        flex: 1,
        color: "#fff",
        opacity: .6,
        padding: 0
    },
    loginContainer: {
        marginTop: 57,
        height: 52,
        borderRadius: 5,
        overflow: "hidden"
    },
    login: {
        flex: 1
    },
    linearGradient: {
        flex: 1
    },
    loginBtnText: {
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
})
