import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Alert} from 'react-native';
import {getJSON} from "./common/fetch"

export default class ProductNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: <View></View>
        }
        getJSON("/api/open/getAll?page=1&perPage=1000").then(json => {
            let data = json.products.data;

            let images = data.map((img, i) => {
                let {id, name, price,} = img
                return (
                    <TouchableOpacity key={i} onPress={() => {
                        Alert.alert("pid:" + id + "")
                    }}>
                        <Image resizeMode={"center"} source={{uri: img.thumbPath}} style={style.image}/>
                    </TouchableOpacity>
                )
            })
            this.setState({
                images: images
            })
        })
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.navTop}>
                    <Text>新品推荐</Text>
                    <Text>查看更多 ></Text>
                </View>
                <ScrollView style={{height: 172}} horizontal={true}>
                    {this.state.images}
                </ScrollView>
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        padding: 10
    },
    navTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        color: "#4a4a4a",
        marginBottom: 10
    },
    image: {
        width: 144,
        height: 184,
        marginRight: 16
    }
})