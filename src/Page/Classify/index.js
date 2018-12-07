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
            navLeft: [{
                name: "全部",
                pid: 0
            }],
            activeNavIndex: 0,
            items: {
                //pid:[Dom]
            }
        }
        this.getNavLeft();
    }

    goItem(pid) {
        navigation.navigate("ClassifySecond", {
            pid
        })
    }

    getNavLeft() {
        getJSON("/api/open/categories?level=1").then(({data}) => {
            let navLeft = []
            data.forEach((nav) => {
                navLeft.push({
                    name: nav.name,
                    pid: nav.id
                })
            })
            this.setState({
                navLeft: [
                    ...this.state.navLeft,
                    ...navLeft
                ]
            }, () => {
                //初始化加载第2个,不加载全部，太慢
                this.onClickNav(1)
            })
        })
    }

    getItems(orderIndex) {
        let pid = 0;
        if (this.state.navLeft[orderIndex]) {
            pid = this.state.navLeft[orderIndex].pid
        }
        let items = this.state.items;
        //内存中数据根据pid来进行缓存
        if (!items[pid]) {
            getJSON(`/api/open/categories?level=2&pid=${pid}`).then(json => {
                items[pid] = json.data.map((item, i) => {
                    return (
                        <TouchableOpacity key={i}
                                          style={style.item}
                                          onPress={this.goItem.bind(this, item.id)}
                        >
                            <View style={style.item}>
                                <Image
                                    style={style.img}
                                    source={{uri: item.thumbPath}}
                                />
                                <Text style={style.itemName}>{item.display_name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })
                this.setState((prevState) => {
                    return {
                        items: {
                            ...prevState.items,
                            ...items
                        }
                    }
                })
            })
        }
    }

    onClickNav(navIndex) {
        if (!this.state.navLeft[navIndex]) {
            return
        }
        this.setState({
            activeNavIndex: navIndex
        }, () => {
            this.getItems(navIndex)
        })
    }

    render() {
        return (
            <View style={{...style.container, ...this.props.containerStyle}}>
                <SearchBar containerStyle={style.searchBarStyle} noBack/>
                <View style={style.bodyWrapper}>
                    <View style={style.leftContainer}>
                        <ScrollView style={style.scrollLeft}>
                            {
                                this.state.navLeft.map(({name}, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={style.navItemContainer}
                                            key={name}
                                            onPress={
                                                this.onClickNav.bind(this, index)
                                            }
                                        >
                                            <View
                                                style={[style.navItem, this.state.activeNavIndex === index && style.activeNavItem]}>
                                                <Text
                                                    style={this.state.activeNavIndex === index ? style.navTextActive : style.navText}>{name}</Text>
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
                    <ScrollView style={style.rightContainer} contentContainerStyle={style.scrollRight}>
                        {
                            this.state.items[this.state.navLeft[this.state.activeNavIndex].pid]
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarStyle: {
        padding: 10
    },
    bodyWrapper: {
        flex: 1,
        flexDirection: "row",
    },
    leftContainer: {
        width: 80,
    },
    scrollLeft: {
        height: "100%",
        backgroundColor: "#F1F1F1"
    },
    navItemContainer: {
        height: 80,
        justifyContent: "center",
        flexGrow: 1
    },
    navItem: {
        flex: 1,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    activeNavItem: {
        backgroundColor: "#fff"
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
        padding: 10,
        flexWrap: "wrap",
        flexDirection: "row",
        // justifyContent: "space-evenly"
    },
    item: {
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        alignItems: "center",
    },
    img: {
        resizeMode: "contain",
        height: 90,
        width: 110
    },
    itemName: {
        marginTop: 3,
    }

});