import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import SearchBar from "../../Component/SearchBar/index"
import {getJSON} from "../../common/fetch"
import navigation from "../../router/navigationService"

/**
 * @param {object} containerStyle - 容器样式
 * */
export default class Classify extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navLeft: ["全部", "上衣", "裤子", "鞋子", "箱包", "配饰", "羽绒"],
            activeNavIndex: 0,
            items: {}
        }
        this.getItems();
    }

    goItem() {
        navigation.navigate("ClassifySecond")
    }

    getItems() {
        let items = this.state.items;
        let name = this.state.navLeft[this.state.activeNavIndex];
        //内存中数据根据名字来判断，有可能会刷新列表，activeNavIndex判断可能会出错
        if (!items[name]) {
            getJSON("/api/open/index/indexCarousels").then(json => {
                items[name] = json.data.map((img, i) => {
                    return (
                        <TouchableOpacity key={i}
                                          style={style.item}
                                          onPress={this.goItem.bind(this)}
                        >
                            <View>
                                <Image
                                    style={style.img}
                                    source={{uri: img.path}}
                                />
                                <Text style={style.itemName}>测试</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                this.setState((prevState) => {
                    return {
                        items: {
                            ...prevState.items,
                            ...items[name]
                        }
                    }
                })
            })
        }
    }

    onClickNav(navIndex) {
        this.setState({
            activeNavIndex: navIndex
        }, () => {
            this.getItems()
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar noBack/>
                <View style={style.bodyWrapper}>
                    <View style={style.leftContainer}>
                        <ScrollView style={style.scrollLeft}>
                            {
                                this.state.navLeft.map((navName, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={style.navItemContainer}
                                            key={navName}
                                            onPress={
                                                this.onClickNav.bind(this, index)
                                            }
                                        >
                                            <View style={style.navItem}>
                                                <Text
                                                    style={this.state.activeNavIndex === index ? style.navTextActive : style.navText}>{navName}</Text>
                                                {
                                                    (this.state.activeNavIndex === index) &&
                                                    <View style={style.navIcon}/>
                                                }
                                            </View>

                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={style.rightContainer}>
                        <ScrollView contentContainerStyle={style.scrollRight}>
                            {
                                this.state.items[this.state.navLeft[this.state.activeNavIndex]]
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyWrapper: {
        flex: 1,
        flexDirection: "row"
    },
    leftContainer: {
        width: 80,
    },
    scrollLeft: {
        height: "100%"
    },
    navItemContainer: {
        height: 80,
        paddingLeft: 20,
        justifyContent: "center",
        flexGrow: 1
    },
    navItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    navIcon: {
        marginLeft: 8,
        borderTopWidth: 4,
        borderBottomWidth: 4,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderRadius: 1,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        borderRightColor: "transparent",
        borderLeftColor: "#F15947",
    },
    navText: {
        color: "#4A4A4A",
        fontSize: 12
    },
    navTextActive: {
        color: "#F15947",
        fontSize: 12
    },
    rightContainer: {
        flex: 1
    },
    scrollRight: {
        height: "100%",
        padding: 10,
        width: "100%",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    item: {
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        alignItems: "center",
    },
    img: {
        resizeMode: "cover",
        height: 90,
        width: 110
    },
    itemName: {
        marginTop: 3,
    }

});