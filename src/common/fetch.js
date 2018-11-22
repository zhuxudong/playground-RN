import config from "../config/config"

function getJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(config.url + url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((response) => {
            response.json().then((data) => {
                resolve(data)
            })
        }).catch((err) => {
            reject(err)
        })
    })
}

export {
    getJSON
}