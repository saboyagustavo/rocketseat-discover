const express = require('express');
const routes = express.Router();

const UserProfile = require('./UserProfile');
const { formatCurrency } = require('./Utils');

const views = __dirname + '/views/';

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 8,
            "total-hours": 8,
            created_at: Date.now()
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now() //-> db standard entry
            // laborCost:
            // remaining:
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJob = Job.data.map((job) => {
                const remaining = Job.services.calcRemainingDays(job);
                const status = remaining ? "progress" : "done";
                const laborCost = Job.services.calcLaborCost(job);

                return {
                    ...job,
                    remaining,
                    status,
                    laborCost,
                };
            });

            return res.render(`${views}index`, { user: UserProfile.data, jobs: updatedJob, formatCurrency });
        },

        add: (req, res) => res.render(`${views}job`),

        create(req, res) {
            const newJob = req.body;
            const lastId = Job.data[Job.data.length - 1]?.id || 0;

            Object.assign(Job.data, [...Job.data, {
                id: lastId + 1,
                name: newJob.name,
                "daily-hours": newJob['daily-hours'],
                "total-hours": newJob['total-hours'],
                created_at: Date.now(),
            }]);

            return res.redirect('/')
        },

        show(req, res) {
            const jobId = req.params.id;
            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if (!job) {
                return res.status(404).send('Job not found!')
            }

            job.laborCost = Job.services.calcLaborCost(job);

            return res.render(`${views}job-edit`, { job, formatCurrency })
        },

        update(req, res) {
            const jobId = req.params.id;
            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if (!job) {
                return res.status(404).send('Job not found!')
            }

            const updatedJob = {
                ...job,
                name: req.body['name'],
                "daily-hours": req.body['daily-hours'],
                "total-hours": req.body['total-hours']
            }

            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob;
                }

                return job
            });

            return res.redirect(`/job/${jobId}`);
        },

        delete(req, res) {
            const jobId = req.params.id;
            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if (!job) {
                return res.status(404).send('Job not found!')
            }

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));
            return res.redirect('/');
        }
    },

    services: {
        calcRemainingDays(job) {
            const createdDate = new Date(job.created_at);
            const laborDays = Math.ceil(job['total-hours'] / job['daily-hours']);
            const dueDay = createdDate.getDate() + laborDays;

            //in milliseconds
            const dueDate = createdDate.setDate(dueDay);

            //-> 86400000 milliseconds, seconds, minutes, hours
            const dayInMs = 1000 * 60 * 60 * 24;

            const timeDiff = dueDate - Date.now();
            const remainingDays = Math.floor(timeDiff / dayInMs);

            //-> deadline: how many days left to due date 
            return remainingDays;
        },

        calcLaborCost: (job) => UserProfile.data["hourly-rate"] * job['total-hours']
    }
}

routes.get('/', Job.controllers.index);

routes.get('/job', Job.controllers.add);
routes.post('/job', Job.controllers.create);

routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

routes.get('/profile', UserProfile.controllers.profile);
routes.post('/profile', UserProfile.controllers.update);

module.exports = routes;