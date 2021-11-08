const makeToken = (n=100) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  
    for (let i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));  
    return text;
}

exports.exec = (app, connection, path) => 
    app
        .post(
            path,
            (req, res) => {
                const username = req.body.username;
                const password = req.body.password; 

                connection.query(`SELECT a.id FROM users a WHERE a.login='${username}' AND a.pass='${password}'`)
                    .then(result => result[0])
                    .then(result => {                        
                        switch (result.length) {
                            case 0:  res.sendStatus(401); break;
                            case 1:  const users_id = result[0].id
                                     const token = makeToken()
                                     
                                     connection.query(`INSERT INTO tokens (users_id, token) VALUES (${users_id}, '${token}')`)
                                        .then(result => {
                                            res.send(token);
                                        })
                                        .catch(err => {
                                            res.sendStatus(500)
                                        })                              
                                     
                                     break;
                            default: res.sendStatus(500); break;
                        }
                    })
                    .catch(err => {
                        res.sendStatus(500)
                    });  
            }
        )