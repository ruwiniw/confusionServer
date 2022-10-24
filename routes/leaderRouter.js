const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');

const leaders = require('../models/leaders')

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) => {
    leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    leaders.create(req.body)
    .then((leader) => {
        console.log('leader created');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders')
})
.delete(authenticate.verifyUser, (req, res, next) => {
    leaders.remove({})
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders' + req.params.leaderId);
})
.put(authenticate.verifyUser, (req, res, next) => {
    leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) =>{
    leaders.findByIdAndDelete(req.params.leaderId)
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    }, (err) => next(err))
});

module.exports = leaderRouter;