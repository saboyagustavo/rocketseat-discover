const express = require('express');
const routes = express.Router();

const UserProfile = require('./UserProfile');
const { formatCurrency } = require('./Utils');

const views = __dirname + '/views/';

const Jobs = {
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
            const updatedJobs = Jobs.data.map((job) => {
                const remaining = Jobs.services.calcRemainingDays(job);
                const status = remaining ? "progress" : "done";
                const laborCost = UserProfile.data["hourly-rate"] * job['total-hours'];

                return {
                    ...job,
                    remaining,
                    status,
                    laborCost,
                };
            });

            return res.render(`${views}index`, { user: UserProfile.data, jobs: updatedJobs, formatCurrency });
        },

        add: (req, res) => res.render(`${views}job`),

        create(req, res) {
            const newJob = req.body;
            const lastId = Jobs.data[Jobs.data.length - 1]?.id || 0;

            Object.assign(Jobs.data, [...Jobs.data, {
                id: lastId + 1,
                name: newJob.name,
                "daily-hours": newJob['daily-hours'],
                "total-hours": newJob['total-hours'],
                created_at: Date.now(),
            }]);

            return res.redirect('/')
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
        }
    }
}

routes.get('/', Jobs.controllers.index);

routes.get('/job', Jobs.controllers.add);

routes.post('/job', Jobs.controllers.create);

routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));

routes.get('/profile', UserProfile.controllers.profile);
routes.post('/profile', UserProfile.controllers.updateProfile);

module.exports = routes;