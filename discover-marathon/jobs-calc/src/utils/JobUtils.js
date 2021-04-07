module.exports = {
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

    calcLaborCost: (job, valueHour) => valueHour * job['total-hours']
}