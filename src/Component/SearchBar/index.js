import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SearchBar} from 'react-native-elements'

/** 顶部搜索组件
 * @param {object} containerStyle - 容器样式
 * @param {object} onChangeText - 文字变化触发的事件
 * @param {object} onClickClear - 取消文本触发的事件
 * @param {object} onClickBack - 退回时触发的事件
 * @param {object} onClickCamera - 点击相机触发的事件
 * @param {boolean} noBack - 是否显示退回按钮,默认false
 * @param {boolean} noCamera - 是否显示相机按钮,默认false
 * */
export default class MySearchBar extends Component {
    static defaultProps = {
        noBack: false,
        noCamera: false
    }

    constructor(props) {
        super(props)
    }

    onChangeText(text) {
        if (typeof this.props.onChangeText === "function") {
            this.props.onChangeText(text)
        }
    }

    onClickClear() {
        if (typeof this.props.onClickClear === "function") {
            this.props.onClickClear()
        }
    }

    onClickBack() {
        if (typeof this.props.onClickBack === "function") {
            this.props.onClickBack()
        }
    }

    onClickCamera() {
        if (typeof this.props.onClickCamera === "function") {
            this.props.onClickCamera()
        }
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                {!this.props.noBack &&
                <TouchableOpacity
                    style={style.back}
                    onPress={this.onClickBack.bind(this)}
                >
                    <Image source={require("./img/back.png")} style={style.backIcon}/>
                </TouchableOpacity>}
                <SearchBar
                    round
                    onChangeText={this.onChangeText.bind(this)}
                    onClear={this.onClickClear.bind(this)}
                    placeholder='搜索'
                    placeholderTextColor={"#CDCDCD"}
                    containerStyle={style.searchBarContainer}
                    inputContainerStyle={style.inputContainerStyle}
                    inputStyle={style.inputStyle}
                />
                {
                    !this.props.noCamera &&
                    <TouchableOpacity
                        style={style.camera}
                        onPress={this.onClickCamera.bind(this)}
                    >
                        <Image source={require("./img/camera.png")}/>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    back: {
        width: 35,
        height: 30,
        alignItems: "center"
    },
    backIcon: {
        flex: 1,
        resizeMode: "contain"
    },
    searchBarContainer: {
        flex: 1,
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
    },
    inputContainerStyle: {
        overflow: "visible",
        backgroundColor: "transparent",
    },
    inputStyle: {
        fontSize: 14,
        color: "#000"
    },
    camera: {
        marginLeft: 15,
        marginRight: 20
    },
});