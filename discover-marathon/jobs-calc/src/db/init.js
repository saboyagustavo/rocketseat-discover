const Database = require('./config');

const ImplementDb = {
    async init() {

        const db = await Database();

        await db.exec(`
            CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar INT,
                monthly_budget INT,
                days_per_week INT,
                hours_per_day INT,
                vacation_per_year INT,
                hourly_rate INT
            );`
        );

        await db.exec(`
            CREATE TABLE jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            );`
        );

        await db.run(`
            INSERT INTO profile (
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                hourly_rate
            ) VALUES (
                "Gustavo",
                "https://github.com/saboyagustavo.png",
                3300,
                6,
                5,
                8,
                30
            );`
        );

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1617514376018
            );`
        );

        await db.run(`
            INSERT INTO jobs (
                name, 
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "OneTwo Projects",
                3,
                47,
                1617514376018
            );`
        );

        await db.close();
    }
}

ImplementDb.init();