require('dotenv').config();
const Teacher = require('./lib/models/Teacher.js');
// const pool = require('./lib/utils/pool.js');

const express = require('express');
const app = express();
app.use(express.json());


app.post('/insert', async (req, res) => {
    try {
        const returnObj = await Teacher.insert(req.body);
        res.send(returnObj);
    } catch (e) {
        res.send(e.message);
    }
    // res.send('Hello')
});

app.get('/find/', async (req, res) => {
    try {
        const returnArray = await Teacher.find();
        res.status(200).json(returnArray);
    } catch (e) {
        res.status(500).json(e.message);
    }
})

app.get('/find/:id', async (req, res) => {
    try {
        const returnObj = await Teacher.findById(req.params.id);
        res.status(200).json(returnObj);
    } catch (e) {
        res.status(500).json(e.message);
    }
})

app.put('/update/:id', async (req, res) => {
    try {
        const returnObj = await Teacher.update(req.params.id, req.body);
        res.send(returnObj);
    } catch (e) {
        res.send(e.message);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const returnObj = await Teacher.delete(req.params.id);
        res.status(200).json(returnObj);
    } catch (e) {
        res.status(500).json(e.message);
    }
})


module.exports = app;




// Teacher
//     .insert({
//         host_id: 'host_id',
//         user_name: 'user_name',
//         email: 'email',
//         pic_url: 'pic_url',
//         access_token: 'access_token',
//         account_id: 'account_id',
//         last_update: 'last_update'
//     })
//     .then(console.log)
//     .then(
// Teacher.find())
//     .then(console.log)
//     .then(
//         Teacher.update(1, {
//             host_id: 'updated host_id',
//             user_name: 'updated user_name',
//             email: 'updated email',
//             pic_url: 'updated pic_url',
//             access_token: 'updated access_token',
//             account_id: 'updated account_id',
//             last_update: 'updated last_update'
//         })
//     )
//     .then(
//         Teacher
//             .delete(1)
//     )
//     .then(
//         console.log
//     )



// Teacher
//     .update(1, {
//         host_id: 'updated host_id',
//         user_name: 'updated user_name',
//         email: 'updated email',
//         pic_url: 'updated pic_url',
//         access_token: 'updated access_token',
//         account_id: 'updated account_id',
//         last_update: 'updated last_update'
//     })
//     .then(console.log)


// Teacher
//     .delete(2)
//     .then(console.log);
// Teacher
//     .delete(3)
//     .then(console.log);
// Teacher
//     .delete(4)
//     .then(console.log);
// Teacher
//     .delete(5)
//     .then(console.log);
