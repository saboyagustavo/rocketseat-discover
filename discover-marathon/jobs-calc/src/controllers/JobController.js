const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const UserProfile = require('../model/UserProfile');
const { formatCurrency } = require('../utils/Utils');


module.exports = {
    index(req, res) {
        const Jobs = Job.get();
        const profile = UserProfile.get();


        const updatedJob = Jobs.map((job) => {
            const remaining = JobUtils.calcRemainingDays(job);
            const status = remaining ? "progress" : "done";
            const laborCost = JobUtils.calcLaborCost(job, profile['hourly-rate']);

            return {
                ...job,
                remaining,
                status,
                laborCost,
            };
        });

        return res.render(`index`, { user: profile, jobs: updatedJob, formatCurrency });
    },

    add: (req, res) => res.render(`job`),

    create(req, res) {
        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0;
        console.log(lastId);
        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body['daily-hours'],
            "total-hours": req.body['total-hours'],
            created_at: Date.now(),
        });

        Job.update(jobs);

        return res.redirect('/')
    },

    show(req, res) {
        const jobId = req.params.id;
        const profile = UserProfile.get();
        const job = Job.get().find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.status(404).send('Job not found!')
        }

        job.laborCost = JobUtils.calcLaborCost(job, profile['hourly-rate']);

        return res.render(`job-edit`, { job, formatCurrency })
    },

    update(req, res) {
        const jobs = Job.get();
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

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob;
            }

            return job
        });

        Job.update(newJobs);

        return res.redirect(`/job/${jobId}`);
    },

    delete(req, res) {
        const jobs = Job.get();
        const jobId = req.params.id;
        const job = Job.get().find(job => Number(job.id) === Number(jobId));

        if (!job) {
            return res.status(404).send('Job not found!')
        }

        Job.delete(jobId);
        return res.redirect('/');
    }
};