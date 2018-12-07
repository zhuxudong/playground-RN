import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import UnityView from "../../react-native-unity-view/out/index";

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Unity extends Component {
    unity = null;

    constructor(props) {
        super(props)
    }

    onMessage(msg) {

    }

    loadScene() {
        if (!this.unity)
            return;
        let pid = this.props.navigation.getParam("pid")
        let args = {
            "cmd": "ShowProductDetail",
            "data": {
                "product_id": pid,
                // "product_id": 2309,
                "is_open": 1
            }
        }
        this.unity.postMessageToUnityManager(JSON.stringify(args))
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <UnityView style={style.unityContainer}
                           onMessage={this.onMessage.bind(this)}
                           ref={(unity) => {
                               this.unity = unity;
                               this.loadScene()
                           }}
                />
            </View>
        )
    }
}

let style = StyleSheet.create({
    container: {
        flex: 1,
    },
    unityContainer: {
        flex: 1
    }
})
