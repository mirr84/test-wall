exports.exec = (app, connection, path) => 
    app
        .get(
            path,
            (req, res) => {
                res.sendStatus(200)
            }
        )