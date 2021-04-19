
const Database = require('../db/config');

module.exports = {
    async get() {
        const db = await Database();

        const data = await db.all(`SELECT * FROM jobs;`);

        db.close();

        return data.map(item => {
            return {

                id: item.id,
                name: item.name,
                "daily-hours": item.daily_hours,
                "total-hours": item.total_hours,
                created_at: item.created_at
            }
        });
    },

    async create(newJob) {
        const db = await Database();

        await db.run(`
            INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${newJob.name}",
                ${newJob['daily-hours']},
                ${newJob['total-hours']},
                ${newJob.created_at}
            );
        `);

        await db.close();
    },

    async update(job, jobId) {
        const db = await Database();

        await db.run(`
            UPDATE jobs SET 
                name = "${job.name}",
                daily_hours = ${job['daily-hours']}, 
                total_hours = ${job['total-hours']},
                created_at = ${job.created_at}
            WHERE id = ${jobId}`);

        await db.close();
    },

    async delete(id) {
        const db = await Database();
        await db.run(`DELETE FROM jobs WHERE id = ${id}`)
        await db.close();
    }
}
