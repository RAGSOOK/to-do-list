const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const pg = require('pg')

const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    post: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

////////////////GET
app.get('/tasks', (req, res) => {
    let queryText = `SELECT * FROM tasks ORDER BY status ASC`
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in get /tasks', error);
        res.sendStatus(500);
    });
});

////////////////POST
app.post('/tasks', (req, res) => {
    let newTask = req.body;
    let queryText = `INSERT INTO tasks ("description")
                    VALUES ($1);`;

    pool.query(queryText, [newTask.description]).then((result) => {
        console.log(result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in POST /tasks', error);
        res.sendStatus(500);
    })
});

//////////////////DELETE
app.delete('/tasks/:id', (req, res) => {
    const queryText = `DELETE FROM tasks WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in DELETE /tasks', error);
        res.sendStatus(500);
    });
});

////////////////////PUT
app.put('/tasks/:id', (req, res) => {
    const queryText = `UPDATE tasks SET status = 'Y'
                        WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT /tasks', error);
    });
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});