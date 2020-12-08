require('dotenv').config();

const pool = require('../lib/utils/pool.js');

run();

async function run() {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS teachers CASCADE;
            DROP TABLE IF EXISTS bookmarks CASCADE;
            DROP TABLE IF EXISTS transcripts CASCADE;
            DROP TABLE IF EXISTS chats CASCADE;
            DROP TABLE IF EXISTS meetings;
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

        CREATE TABLE bookmarks(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            meetingId INTEGER NOT NULL,
            teacherId INTEGER NOT NULL,
            topic TEXT NOT NULL,
            start_time TEXT NOT NULL,
            identifier TEXT NOT NULL,
            time_start TEXT NOT NULL,
            speaker TEXT NOT NULL);

        CREATE TABLE transcripts(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            meetingId INTEGER NOT NULL,
            teacherId INTEGER NOT NULL,
            identifier TEXT NOT NULL,
            start_ts TEXT NOT NULL,
            end_ts TEXT NOT NULL,
            text TEXT NOT NULL,
            styles TEXT NOT NULL);

        CREATE TABLE chats(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            meetingId INTEGER NOT NULL,
            teacherId INTEGER NOT NULL,
            timestamp TEXT NOT NULL,
            speaker TEXT NOT NULL,
            text TEXT NOT NULL);

        CREATE TABLE meetings(
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            publish BOOLEAN NOT NULL,
            user_name TEXT NOT NULL,
            email TEXT NOT NULL,
            pic_url TEXT NOT NULL,
            host_id TEXT NOT NULL,
            account_id TEXT NOT NULL,
            topic TEXT NOT NULL,
            start_time TEXT NOT NULL,
            share_url TEXT NOT NULL,
            duration INTEGER NOT NULL,
            transcript_url TEXT NOT NULL,
            video_url TEXT NOT NULL,
            audio_url TEXT NOT NULL,
            chat_url TEXT NOT NULL);
            `);

        await pool.end()

    } catch (err) {
        console.log(err);
    }
}