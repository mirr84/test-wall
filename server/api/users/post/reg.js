exports.exec = (app, connection, path) =>
    app
        .post(
            path,
            (req, res) => {
                const username = req.body.username;
                const password = req.body.password; 

                connection.query(`INSERT INTO users (login, pass) VALUES ('${username}', '${password}')`)
                .then(result => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    console.log(err)
                    res.sendStatus(500)
                })   

            }
        )