require('dotenv').config();
const Teacher = require('./lib/models/Teacher.js');
// const pool = require('./lib/utils/pool.js');

const express = require('express');
const app = express();
app.use(express.json());


app.post('/insert/', async (req, res) => {
    const returnObj = await Teacher.insert(req.body);
    res.status(200).json(returnObj);

});

app.get('/find/', async (req, res) => {
    const returnArray = await Teacher.find();
    res.status(200).json(returnArray);
})

app.get('/find/:id', async (req, res) => {
    const returnObj = await Teacher.findById(req.params.id);
    res.status(200).json(returnObj);
})

app.put('/update/:id', async (req, res) => {
    console.log(req.body)
    const returnObj = await Teacher.update(req.params.id, req.body);
    res.status(200).json(returnObj);
})

app.listen(3000, () => {
    console.log('3000!!!!!!!!!!!!!!!!!!!!!!')
})






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
