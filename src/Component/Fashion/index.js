import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {getJSON} from "../../common/fetch"
import FashionCard from "../FashionCard/index"
import navigation from "../../router/navigationService"

const MAXCARD = 100
/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Fashion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
        this.getCards();
    }

    getCards() {
        getJSON(`/api/open/index/series?per_page=1000&page=1&with=colors,products`).then(json => {
            let cards = json.data.data && json.data.data.map((data, i) => {
                let {id, name, description, colors, products} = data
                return (
                    <FashionCard
                        key={i}
                        title={name}
                        subTitle={description}
                        imgs={products.map((p) => p.thumbPath)}
                        colors={colors.map(c => ({color: c.rgb, percent: c.percent}))}
                        onPress={this.onClickCard.bind(this, id)}
                    />
                )
            })
            this.setState(() => ({
                cards
            }))
        })
    }

    onClickCard(id) {
        getJSON(`/api/open/index/series/${id}`).then(json => {
            if (!json.data) {
                Alert.alert(json.message)
                return;
            }
            let {name, description, thumbPath, products} = json.data;
            navigation.navigate("SeriesDetail", {
                data: {
                    name,
                    description,
                    thumbPath,
                    products
                }
            })
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <View style={style.headLine}/>
                <Text style={style.title}>流行趋势</Text>
                <ScrollView horizontal style={style.scrollView}>
                    {this.state.cards}
                </ScrollView>
                <View style={style.headLine}/>
            </View>
        );
    }
}

let style = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    headLine: {
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#F1F1F1",
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        color: "#36393D",
        marginBottom: 20,
        paddingLeft: 10
    },
    scrollView: {
        flexDirection: "row"
    },
})