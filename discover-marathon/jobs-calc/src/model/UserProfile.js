const data = {
    name: 'Gustavo',
    avatar: 'https://github.com/saboyagustavo.png',
    "monthly-budget": 3300.00,
    "hours-per-day": 6,
    "days-per-week": 5,
    "vacation-per-year": 8,
    "hourly-rate": 0
};

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        Object.assign(data, newData);
    }
};