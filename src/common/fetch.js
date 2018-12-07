import config from "../config/config"
import {AsyncStorage} from "react-native"

/**
 * @param {boolean} noRefreshAuto - 默认false,401时会进行refresh Token操作再进行接口请求
 * */
function getJSON(url, header, noRefreshAuto) {
    return new Promise((resolve, reject) => {
        fetch(config.url + url, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                ...header
            }
        }).then((response) => {
            if (response.status === 401) {
                if (noRefreshAuto) {
                    reject()
                } else {
                    refreshToken().then((token) => {
                        getJSON(url, {
                            ...header,
                            Authorization: token
                        }, true).then(data => resolve(data))
                    })
                }
            } else {
                response.json().then((data) => {
                    resolve(data)
                })
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * @param {boolean} noRefreshAuto - 默认false,401时会进行refresh Token操作再进行接口请求
 * */
function post(url, body, header, noRefreshAuto) {
    return new Promise((resolve, reject) => {
        fetch(config.url + url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.status === 401) {
                if (noRefreshAuto) {
                    reject()
                } else {
                    refreshToken().then((token) => {
                        post(url, body, {
                            ...header,
                            Authorization: token
                        }, true).then(data => resolve(data))
                    })
                }
            } else {
                response.json().then((data) => {
                    resolve(data)
                })
            }
        }).catch((err) => {
            reject(err)
        })
    })
}

/**
 * return {Promise.then((token_type+" "+access_token ))}*/
function refreshToken() {
    return new Promise((resolve) => {
        AsyncStorage.getItem("refresh_token").then((refreshToken) => {
            post("/oauth/token", {
                "client_id": "2",
                "grant_type": "refresh_token",
                "client_secret": config.client_secret,
                "refresh_token": refreshToken
            }, null, true).then((data) => {
                new Promise.all([
                    AsyncStorage.setItem("access_token", data["access_token"]),
                    AsyncStorage.setItem("refresh_token", data["refresh_token"]),
                    AsyncStorage.setItem("token_type", data["token_type"])
                ]).then(() => {
                    resolve(data["token_type"] + " " + data["access_token"])
                })
            })
        })
    })
}

function checkLogin() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("access_token").then((token) => {
            if (!token) {
                resolve(false)
            } else {
                resolve(true)
            }
        }).catch((e) => reject(e))
    })
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        post("/oauth/token", {
            "client_id": "2",
            "grant_type": "password",
            "client_secret": config.client_secret,
            username,
            password
        }, null, true).then((data) => {
            new Promise.all([
                AsyncStorage.setItem("access_token", data["access_token"]),
                AsyncStorage.setItem("refresh_token", data["refresh_token"]),
                AsyncStorage.setItem("token_type", data["token_type"])
            ]).then(() => {
                resolve()
            })
        }).catch((e) => {
            reject(e)
        })
    })
}

function logout() {
    return new Promise.all([
        AsyncStorage.removeItem("access_token"),
        AsyncStorage.removeItem("refresh_token"),
        AsyncStorage.removeItem("token_type")
    ])
}

export {
    getJSON,
    post,
    checkLogin,
    login,
    logout
}