exports.exec = (app, connection, path) =>
    app
        .post(
            path,
            (req, res) => {
                const text = req.body;
                res.sendStatus(200)
            }
        )