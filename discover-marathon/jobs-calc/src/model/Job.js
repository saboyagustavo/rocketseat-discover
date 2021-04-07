let data = [
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
];

module.exports = {
    get() {
        return data;
    },

    update(newJob) {
        data = newJob;
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id));
    }
}
