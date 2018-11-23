import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import {getJSON} from "../common/fetch"

const {width} = Dimensions.get('window')
export default class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        getJSON("/api/front/index/getIndexThumbs").then(json => {
            let images = json.data;
            images = images.map((img, i) => {
                return (
                    <Image key={i} source={{uri: img.path}} style={style.image} resizeMode={"contain"}/>
                )
            })
            this.setState({
                images: images
            })
        })
    }

    render() {
        return (
            <Swiper autoplay={true} containerStyle={style.containerStyle} showsPagination={false} showsButtons={false}>
                {this.state.images[0]}
                {this.state.images[1]}
                {this.state.images[2]}
                {this.state.images[3]}
            </Swiper>
        );
    }
}

let style = StyleSheet.create({
    containerStyle: {
        flexGrow: 0,
        flexBasis: 172,
    },
    image: {
        flex: 1
    }
})