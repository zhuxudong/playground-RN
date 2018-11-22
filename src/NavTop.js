import React, {Component} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import Banner from "./Banner"

export default class NavTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPublic: true
        }
    }

    setPublic = (setPublic) => {
        this.setState(() => ({
            isPublic: setPublic
        }))
    }

    render() {
        return (
            <View style={style.navContainer}>
                <Text style={[style.nav, this.state.isPublic && style.navActive]}
                      onPress={(e) => this.setPublic(true, e)}
                >广场</Text>
                <Text style={[style.nav, !this.state.isPublic && style.navActive]}
                      onPress={this.setPublic.bind(this, false)}
                >我的</Text>
            </View>
        );
    }
}

let style = StyleSheet.create({
    navContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    nav: {
        height: 64,
        lineHeight: 64,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 16,
        letterSpacing: 2
    },
    navActive: {
        borderBottomColor: "#647B80",
        borderBottomWidth: 2,
        borderRadius: 1,
        color: "#647B80"
    }
})