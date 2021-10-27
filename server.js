const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const bricks = [
    { id: 1, text: "blabla 1" },
    { id: 2, text: "blabla 2" }
]

app.get(
    "/api/bricks",
    (req, res) => {
        console.log("get bricks");
        res.json(bricks)
    }
)

app.post(
    "/api/bricks",
    (req, res) => {
        console.log("post bricks json " + JSON.stringify(req.body));
        const body = req.body;
        const newBrick = {id: "111", text: body.text}
        bricks.push(newBrick)

        res.json(newBrick)
    }
)

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'client/build/index.html')) })

app.listen(5000, ()=> { 
    console.log('server is running...')
 })