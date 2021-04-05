const views = __dirname + '/views/';
const { formatCurrency } = require('./Utils');
const UserProfile = {
    data: {

        name: 'Gustavo',
        avatar: 'https://github.com/saboyagustavo.png',
        "monthly-budget": 3300.00,
        "hours-per-day": 6,
        "days-per-week": 5,
        "vacation-per-year": 8,
        "hourly-rate": 0
    },

    controllers: {
        profile: (req, res) => res.render(`${views}profile`, { user: UserProfile.data, formatCurrency }),

        update(req, res) {
            const updatedProfile = req.body



            Object.assign(UserProfile.data, {
                ...updatedProfile,
                "hourly-rate": UserProfile.services.calcHourlyWage(updatedProfile)
            });

            return res.redirect('/profile')
        }
    },

    services: {
        calcHourlyWage(updatedProfile) {
            const yearlyWeeks = 52;
            const yearlyLaborWeeks = yearlyWeeks - updatedProfile['vacation-per-year'];
            const yearlyLaborDays = yearlyLaborWeeks * updatedProfile['days-per-week'];
            const monthlyLaborDays = yearlyLaborDays / 12;
            const hourlyWage = updatedProfile['monthly-budget']
                / (monthlyLaborDays * updatedProfile["hours-per-day"]);

            return hourlyWage;
        }
    }
};

module.exports = UserProfile;