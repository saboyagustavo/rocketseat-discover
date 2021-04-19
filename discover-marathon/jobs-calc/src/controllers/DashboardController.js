const Job = require("../model/Job");
const UserProfile = require("../model/UserProfile");
const JobUtils = require("../utils/JobUtils");
const { formatCurrency } = require("../utils/Utils");

module.exports = {
    async index(req, res) {
        const Jobs = await Job.get();
        const profile = await UserProfile.get();

        let statusCount = {
            projects: Jobs.length,
            progress: 0,
            done: 0,
            freeHours: profile['hours-per-day'],
        };

        let workload = 0;

        const updatedJob = Jobs.map((job) => {
            const remaining = JobUtils.calcRemainingDays(job);
            const status = remaining <= 0 ? "done" : "progress";
            const laborCost = JobUtils.calcLaborCost(job, profile['hourly-rate']);

            statusCount[status] += 1;

            workload = status === 'progress' ? workload + job['daily-hours'] : workload

            return {
                ...job,
                remaining,
                status,
                laborCost,
            };
        });

        statusCount.freeHours -= workload;

        return res.render(`index`, { user: profile, jobs: updatedJob, statusCount, formatCurrency });
    }
}