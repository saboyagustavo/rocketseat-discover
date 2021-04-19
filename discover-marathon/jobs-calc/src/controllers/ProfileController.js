const { formatCurrency } = require('../utils/Utils');
const UserProfile = require('../model/UserProfile');
const ProfileUtils = require('../utils/ProfileUtils');

module.exports = {
    profile: async (req, res) => res.render(`profile`, { user: await UserProfile.get(), formatCurrency }),

    update: async (req, res) => {
        const updatedProfile = req.body

        const profile = await UserProfile.get();

        await UserProfile.update({
            ...profile,
            ...updatedProfile,
            "hourly-rate": ProfileUtils.calcHourlyWage(updatedProfile)
        });

        return res.redirect('/profile')
    }
};