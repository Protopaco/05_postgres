const pool = require('../utils/pool');

module.exports = class Bookmarks {
    meetingId;
    teacherId;
    topic;
    start_time;
    identifier;
    time_start;
    speaker;

    constructor(row) {
        this.id = row.id;
        this.meetingId = row.meetingId;
        this.teacherId = row.teacherId;
        this.topic = row.topic;
        this.start_time = row.start_time;
        this.identifier = row.identifier;
        this.time_start = row.time_start;
        this.speaker = row.speaker;
    }

    static async insert({ meetingId, teacherId, topic, start_time, identifier, time_start, speaker }) {
        try {
            const { rows } = await pool.query(
                `INSERT INTO bookmarks 
            ( meetingId, teacherId, topic, start_time, identifier, time_start, speaker )
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING * `,
                [meetingId, teacherId, topic, start_time, identifier, time_start, speaker]);

            return new Bookmarks(rows[0]);
        } catch (e) {
            console.log('ERROR')
            throw new Error(e)
        }
    }

    static async find() {
        const { rows } = await pool.query(`SELECT * FROM bookmarks 
        ORDER BY id ASC`);
        return rows.map(row => new Bookmarks(row));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM bookmarks WHERE id = $1`,
            [id]);

        if (!rows[0]) throw new Error(`No meeting with id ${id}`);

        return new Bookmarks(rows[0]);
    }

    static async update(id, { meetingId, teacherId, topic, start_time, identifier, time_start, speaker }) {
        const { rows } = await pool.query(
            `UPDATE bookmarks
            SET 
            meetingId = $1,
            teacherId = $2,
            topic = $3,
            start_time = $4,
            identifier = $5,
            time_start = $6,
            speaker = $7
            WHERE id = $8
            RETURNING * `,
            [meetingId, teacherId, topic, start_time, identifier, time_start, speaker, id]);

        return new Bookmarks(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM bookmarks WHERE id=$1 RETURNING *',
            [id]);

        return new Bookmarks(rows[0]);
    }
}