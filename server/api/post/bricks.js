exports.exec = (app, connection, path) =>
    app.post(
        path,
        (req, res) => {
            console.log("post bricks json " + JSON.stringify(req.body));
            const text = req.body.text;

            connection.query(`INSERT INTO wall (message) VALUES ('${text}')`)
                .then(result => result[0])
                .then(result => {                
                    res.json({ id: result.insertId, text })
                })
                .catch(err => {
                    res.json({})
                }); 
        }
    )