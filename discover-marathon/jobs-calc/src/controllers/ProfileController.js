const { formatCurrency } = require('../utils/Utils');
const UserProfile = require('../model/UserProfile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
    profile: (req, res) => res.render(`profile`, { user: UserProfile.get(), formatCurrency }),

    update(req, res) {
        const updatedProfile = req.body



        UserProfile.update({
            ...updatedProfile,
            "hourly-rate": ProfileUtils.calcHourlyWage(updatedProfile)
        });

        return res.redirect('/profile')
    }
};