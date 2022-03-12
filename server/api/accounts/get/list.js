exports.exec = (app, connection, path) =>
    app
        .get(
            path,
            (req, res) => {

                const token = req.headers.token

                if (!token) {
                    res.sendStatus(401)
                } else {

                    let { current = 1, pageSize = 10, order = 'ascend', field = 'id' } = req.query;

                    if (order == 'ascend') {
                        order = 'ASC'
                    } else {
                        order = 'DESC'
                    }

                    connection.query(`
                            SELECT a.id, a.title 
                            FROM accounts a 
                            LEFT JOIN tokens t ON t.users_id = a.users_id 
                            WHERE t.token='${token}'
                            ORDER BY ${field} ${order}
                        `)
                        .then(result => {
                            res.json(result[0])
                        })
                        .catch(err => {
                            res.sendStatus(500)
                        });                        

                }

            }
        )