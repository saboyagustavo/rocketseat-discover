const express = require('express');
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const routes = express.Router();

routes.get('/', JobController.index);

routes.get('/job', JobController.add);
routes.post('/job', JobController.create);

routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.profile);
routes.post('/profile', ProfileController.update);

module.exports = routes;