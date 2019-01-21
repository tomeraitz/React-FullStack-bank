const express = require('express')
const router = express.Router()
// const moment = require('moment');
const Transaction = require('../models/Transaction')

router.get('/transcations', function (req, res) {
    Transaction
    .find({})
    .exec(function (err, transcations) {
        res.send(transcations)
    })
})

router.post('/transcation', function (req, res) {
    let data = req.body
    let transaction = new Transaction(data)
    transaction.save()
    res.end()
})



module.exports = router