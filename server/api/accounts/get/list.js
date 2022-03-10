exports.exec = (app, connection, path) =>
    app
        .get(
            path,
            (req, res) => {

                const token = req.headers.token
                if (!token) {
                    res.sendStatus(401)
                } else {
                    connection.query(`SELECT a.id, a.title FROM accounts a LEFT JOIN tokens t ON t.users_id = a.users_id WHERE t.token='${token}'`)
                        .then(result => {
                            res.json(result[0])
                        })
                        .catch(err => {
                            res.sendStatus(500)
                        });

                }

            }
        )