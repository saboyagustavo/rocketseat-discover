const views = __dirname + '/views/';

const UserProfile = {
    data: {

        name: 'Gustavo',
        avatar: 'https://avatars.githubusercontent.com/u/64825005?v=4',
        "monthly-budget": 3300.00,
        "hours-per-day": 6,
        "days-per-week": 5,
        "vacation-per-year": 44,
        "hourly-rate": 67.43
    },

    controllers: {
        profile: (req, res) => res.render(`${views}profile`, { user: UserProfile.data }),
    }
};

module.exports = UserProfile;