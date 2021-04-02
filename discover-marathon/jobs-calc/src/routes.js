const express = require('express');
const routes = express.Router();
const user = require('./UserProfile');

const views = __dirname + '/views/';


routes.get('/', (req, res) => res.render(`${views}index`, { user }));

routes.get('/job', (req, res) => res.render(`${views}job`));

routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));

routes.get('/profile', (req, res) => res.render(`${views}profile`, { user }));

module.exports = routes;