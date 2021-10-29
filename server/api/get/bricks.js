exports.exec = (app, connection, path) =>
    app
        .get(
            path,
            (req, res) => {        
                connection.query("SELECT * FROM wall")
                    .then(result => result[0])
                    .then(result => result.map( a => ({id: a.id, text: a.message}) ))
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err => {
                        res.json([])
                    });  
            }
        )