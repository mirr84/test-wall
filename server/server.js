const express = require('express')
const path = require('path')
const mysql = require("mysql2")

const app = express()
app.use(express.json())

const connection = mysql.createConnection({
    host: "y913929d.beget.tech",
    user: "y913929d_wall",
    database: "y913929d_wall",
    password: "lz&WWp5u"
}).promise();

function intervalFunc() {
    connection.query("select now()")
        .then(result => result[0])
        .then(result => {})
        .catch(err => {});
}
setInterval(intervalFunc, 3000);

function apiPromise (app, path=[], type = "private", method = "get") {
    let p1 = [...path];
    let p2 = [...path];    
    p1.splice(p1.length-1,0, method)
    p1 = "./" + p1.join("/") + ".js"
    p2 = "/" + p2.join("/")
    return require(p1).exec(app, connection, p2)
}

apiPromise(app, ["api","users","check"], "private", "get")
apiPromise(app, ["api","users","auth"], "public", "post")
apiPromise(app, ["api","users","reg"], "public", "post")

apiPromise(app, ["api","accounts","list"], "private", "get")

// apiPromise(app, ["api","users","reg"], "public", "post")

app.use(express.static(path.join(__dirname, './../client/build')))
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, './../client/build/index.html')) })

app.listen(5000, () => {
    console.log('server is running...')
})