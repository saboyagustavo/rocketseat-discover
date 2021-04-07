module.exports = {
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