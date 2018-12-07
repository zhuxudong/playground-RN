import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableWithoutFeedback} from 'react-native';
import navigation from "../../router/navigationService"
import I18n from "../../common/i18n"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class NavBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    pick(index) {
        this.setState({
            activeIndex: index
        }, () => {
            let componentName = "";
            switch (index) {
                case 0:
                    componentName = "Home";
                    break;
                case 1:
                    componentName = "Classify";
                    break;
                case 2:
                    componentName = "Favorite";
                    break;
                case 3:
                    componentName = "My";
                    break;
            }
            navigation.navigate(componentName)
        })
    }

    highLight(index) {
        this.setState({
            activeIndex: index
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <TouchableWithoutFeedback onPress={this.pick.bind(this, 0)}>
                    <View style={style.item}>
                        {
                            this.state.activeIndex === 0 ?
                                <Image style={style.navIcon} source={require("./img/home_active.png")}/> :
                                <Image style={style.navIcon} source={require("./img/home.png")}/>
                        }
                        <Text
                            style={[style.text, this.state.activeIndex === 0 && style.activeText]}>{I18n.t("navBottom.homeIconName")}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.pick.bind(this, 1)}>
                    <View style={style.item}>
                        {
                            this.state.activeIndex === 1 ?
                                <Image style={style.navIcon} source={require("./img/classify_active.png")}/> :
                                <Image style={style.navIcon} source={require("./img/classify.png")}/>
                        }
                        <Text
                            style={[style.text, this.state.activeIndex === 1 && style.activeText]}>{I18n.t("navBottom.classifyIconName")}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.pick.bind(this, 2)}>
                    <View style={style.item}>
                        {
                            this.state.activeIndex === 2 ?
                                <Image style={style.navIcon} source={require("./img/favorite_active.png")}/> :
                                <Image style={style.navIcon} source={require("./img/favorite.png")}/>
                        }
                        <Text
                            style={[style.text, this.state.activeIndex === 2 && style.activeText]}>{I18n.t("navBottom.favoriteIconName")}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.pick.bind(this, 3)}>
                    <View style={style.item}>
                        {
                            this.state.activeIndex === 3 ?
                                <Image style={style.navIcon} source={require("./img/my_active.png")}/> :
                                <Image style={style.navIcon} source={require("./img/my.png")}/>
                        }
                        <Text
                            style={[style.text, this.state.activeIndex === 3 && style.activeText]}>{I18n.t("navBottom.myIconName")}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderTopColor: "#F1F1F1",
        borderTopWidth: 1
    },
    item: {
        justifyContent: "center",
        alignItems: "center"
    },
    navIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    activeNavIcon: {},
    text: {
        marginTop: 5,
        fontSize: 10,
        color: "#4A4A4A"
    },
    activeText: {
        color: "#F15947"
    }
});