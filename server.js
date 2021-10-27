const express = require('express');

const app = express();
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
        console.log("post bricks " + req.body.text);
        const body = req.body;
        const newBrick = {id: "111", text: body.text}
        bricks.push(newBrick)

        res.json(newBrick)
    }
)


app.listen(5000, ()=> { 
    console.log('server is running...')
 })