const pool = require('../utils/pool');

module.exports = class Meeting {
    publish;
    user_name;
    email;
    pic_url;
    host_id;
    account_id;
    topic;
    start_time;
    share_url;
    duration;
    transcript_url;
    video_url;
    audio_url;
    chat_url;

    constructor(row) {
        this.id = row.id;
        this.publish = row.publish;
        this.user_name = row.user_name;
        this.email = row.email;
        this.pic_url = row.pic_url;
        this.host_id = row.host_id;
        this.account_id = row.account_id;
        this.topic = row.topic;
        this.start_time = row.start_time;
        this.share_url = row.share_url;
        this.duration = row.duration;
        this.transcript_url = row.transcript_url;
        this.video_url = row.video_url;
        this.audio_url = row.audio_url;
        this.chat_url = row.chat_url;
    }

    static async insert({ publish, user_name, email, pic_url, host_id, account_id, topic, start_time, share_url, duration, transcript_url, video_url, audio_url, chat_url }) {
        const { rows } = await pool.query(
            'INSERT INTO songs ( publish, user_name, email, pic_url, host_id, account_id, topic, start_time, share_url, duration, transcript_url, video_url, audio_url, chat_url)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING * ',
            [publish, user_name, email, pic_url, host_id, account_id, topic, start_time, share_url, duration, transcript_url, video_url, audio_url, chat_url]
        );

        return new Meeting(rows[0]);

    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM meetings');

        return rows.map(row => new Meeting(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM meetings WHERE id = $1',
            [id]);

        if (!rows[0]) throw new Error(`No meeting with id ${id}`);
        return new Meeting(rows[0]);
    }

    static async update(id, { publish, user_name, email, pic_url, host_id, account_id, topic, start_time, share_url, duration, transcript_url, video_url, audio_url, chat_url }) {
        const { rows } = await pool.query(
            'UPDATE meetings
            SET 
            publish = $1,
            user_name = $2,
            email = $3,
            pic_url = $4,
            host_id = $5,
            account_id = $6,
            topic = $7,
            start_time = $8,
            share_url = $9,
            duration = $10,
            transcript_url = $11,
            video_url = $12,
            audio_url = $13,
            chat_url = $14
        WHERE id = $15
        RETURNING * ',
            [publish, user_name, email, pic_url, host_id, account_id, topic, start_time, share_url, duration, transcript_url, video_url, audio_url, chat_url]);

        return new Meeting(rows[0])
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM meetings WHERE id=$1 RETURNING *',
            [id]);

        return new Meeting(rows[0]);
    }
};


