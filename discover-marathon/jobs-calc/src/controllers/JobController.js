const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const UserProfile = require('../model/UserProfile');
const { formatCurrency } = require('../utils/Utils');


module.exports = {
    add: (req, res) => res.render(`job`),

    async create(req, res) {
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours'],
            created_at: Date.now(),
        });

        return res.redirect('/')
    },

    async show(req, res) {
        const jobId = req.params.id;
        const profile = await UserProfile.get();
        const jobs = await Job.get();
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.status(404).send('Job not found!')
        }

        job.laborCost = JobUtils.calcLaborCost(job, profile['hourly-rate']);

        return res.render(`job-edit`, { job, formatCurrency })
    },

    async update(req, res) {
        const jobs = await Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.status(404).send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body['name'],
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours']
        }

        await Job.update(updatedJob, updatedJob.id);

        return res.redirect(`/job/${jobId}`);
    },

    async delete(req, res) {
        const jobs = await Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.status(404).send('Job not found!')
        }

        await Job.delete(jobId);
        return res.redirect('/');
    }
};