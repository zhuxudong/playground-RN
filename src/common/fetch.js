import config from "../config/config"
import storage from "../config/storage"
import {AsyncStorage} from "react-native"

function getJSON(url, header, refreshAgainWhen401 = true) {
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
                if (refreshAgainWhen401) {
                    refreshToken().then((token) => {
                        getJSON(url, {
                            ...header,
                            Authorization: token
                        }, false).then(data => resolve(data))
                    })
                } else {
                    reject()
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

function post(url, body, header, refreshAgainWhen401 = true) {
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
                if (refreshAgainWhen401) {
                    refreshToken().then((token) => {
                        post(url, body, {
                            ...header,
                            Authorization: token
                        }, false).then(data => resolve(data))
                    })
                } else {
                    reject()
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

function getJSONWithToken(url, header, refreshAgainWhen401 = true) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(storage.accessToken).then((token) => {
            if (!token)
                return;
            AsyncStorage.getItem(storage.tokenType).then((type) => {
                getJSON(url, {
                    ...header,
                    Authorization: type + " " + token
                }, refreshAgainWhen401).then((data) => {
                    resolve(data)
                }).catch((err) => reject(err))
            })
        })
    })
}

function postWithToken(url, body, header, refreshAgainWhen401 = true) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(storage.accessToken).then((token) => {
            if (!token)
                return;
            AsyncStorage.getItem(storage.tokenType).then((type) => {
                post(url, body, {
                    ...header,
                    Authorization: type + " " + token
                }, refreshAgainWhen401).then((data) => {
                    resolve(data)
                }).catch((err) => reject(err))
            })
        })
    })
}

function refreshToken() {
    return new Promise((resolve) => {
        AsyncStorage.getItem(storage.refreshToken).then((refreshToken) => {
            post("/oauth/token", {
                "client_id": "2",
                "grant_type": "refresh_token",
                "client_secret": config.client_secret,
                "refresh_token": refreshToken
            }, null, false).then((data) => {
                new Promise.all([
                    AsyncStorage.setItem(storage.accessToken, data["access_token"]),
                    AsyncStorage.setItem(storage.refreshToken, data["refresh_token"]),
                    AsyncStorage.setItem(storage.tokenType, data["token_type"])
                ]).then(() => {
                    resolve(data["token_type"] + " " + data["access_token"])
                })
            })
        })
    })
}

function checkLogin() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(storage.accessToken).then((token) => {
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
        }, null, false).then((data) => {
            new Promise.all([
                AsyncStorage.setItem(storage.accessToken, data["access_token"]),
                AsyncStorage.setItem(storage.refreshToken, data["refresh_token"]),
                AsyncStorage.setItem(storage.tokenType, data["token_type"])
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
        AsyncStorage.removeItem(storage.accessToken),
        AsyncStorage.removeItem(storage.refreshToken),
        AsyncStorage.removeItem(storage.tokenType)
    ])
}

export {
    getJSON,
    getJSONWithToken,
    post,
    postWithToken,
    checkLogin,
    login,
    logout
}