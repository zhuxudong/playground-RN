import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {getJSON} from "../../common/fetch"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        this.getCarousels();

    }

    getCarousels() {
        getJSON("/api/open/index/indexCarousels").then(json => {
            let images = json.data;
            images = images.map((img, i) => {
                return (
                    <TouchableOpacity key={i} style={style.bannerImage}>
                        <Image source={{uri: img.path}} style={style.bannerImage}/>
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
            <View style={{...style.container, ...this.props.containerStyle}}>
                <Swiper autoplayTimeout={2} autoplay={true} containerStyle={style.swiper} showsPagination={false}
                        showsButtons={false}>
                    {this.state.images}
                </Swiper>

                <View style={style.search}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Search")
                    }}>
                        <Image source={require("./img/search.png")} style={style.searchImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require("./img/capture.png")} style={style.captureImg}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        height: 130,
        flexDirection: "row"
    },
    swiper: {
        flex: 4,
        marginLeft: 10,
        position: "relative"
    },
    bannerImage: {
        flex: 1,
        resizeMode: "cover",
        borderRadius: 5
    },
    search: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingLeft: 10,
        paddingRight: 10
    },
    searchImg: {
        width: 65,
        height: 90,
        resizeMode: "cover"
    },
    captureImg: {
        width: 65,
        height: 35,
        resizeMode: "cover"
    }
})