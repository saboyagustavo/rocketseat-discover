const express = require('express');
const routes = express.Router();
const user = require('./UserProfile');

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
                const laborCost = Jobs.services.formatCurrency(user["hourly-rate"] * job['total-hours']);

                return {
                    ...job,
                    remaining,
                    status,
                    laborCost,
                };
            });

            return res.render(`${views}index`, { user, jobs: updatedJobs });
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

        formatCurrency(value) {
            return Intl.NumberFormat('pt-BR',
                { style: 'currency', currency: 'BRL' })
                .format(value);
        },

    }
}

routes.get('/', Jobs.controllers.index);

routes.get('/job', (req, res) => res.render(`${views}job`));

routes.post('/job', (req, res) => {
    const newJob = req.body;
    const lastId = Jobs[Jobs.length - 1]?.id || 0;

    Object.assign(Jobs, [...Jobs, {
        id: lastId + 1,
        name: newJob.name,
        "daily-hours": newJob['daily-hours'],
        "total-hours": newJob['total-hours'],
        created_at: Date.now(),
    }]);

    return res.redirect('/')
});

routes.get('/job/edit', (req, res) => res.render(`${views}job-edit`));

routes.get('/profile', (req, res) => res.render(`${views}profile`, { user }));

module.exports = routes;