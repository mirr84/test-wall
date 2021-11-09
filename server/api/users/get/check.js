exports.exec = (app, connection, path) => 
    app
        .get(
            path,
            (req, res) => {

                const token = req.headers.token
                if (!token) {
                    res.sendStatus(401)
                } else {

                    connection.query(`SELECT a.users_id FROM tokens a WHERE a.token='${token}'`)
                    .then(result => result[0])
                    .then(result => {
                        if (result.length > 0) {
                            const users_id = result[0].users_id
                            res.send(`${users_id}`)        
                        } else {
                            res.sendStatus(401)
                        }                      
                    })
                    .catch(err => {
                          res.sendStatus(500)
                    });  

                }
                
            }
        )