require('dotenv').config();
const Teacher = require('./lib/models/Teacher.js');

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
});

app.get('/find/', async (req, res) => {
    try {
        const returnArray = await Teacher.find();
        res.send(returnArray);
    } catch (e) {
        res.send(e.message);
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
