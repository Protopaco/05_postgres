require('dotenv').config();

const pool = require('../lib/utils/pool.js');

run();

async function run() {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS teachers
            `);

        await pool.query(`
        CREATE TABLE teachers(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            host_id TEXT NOT NULL,
            user_name TEXT NOT NULL,
            email TEXT NOT NULL,
            pic_url TEXT,
            access_token TEXT,
            account_id TEXT NOT NULL,
            last_update TEXT NOT NULL);
            `);

        console.log('THE TABLES ARE DROPPED! LONG LIVE THE TABLES!')

        await pool.close()

    } catch (err) {
        console.log(err);
    }
}