const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

routes.get('/', DashboardController.index);

routes.get('/job', JobController.add);
routes.post('/job', JobController.create);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.profile);
routes.post('/profile', ProfileController.update);

module.exports = routes;