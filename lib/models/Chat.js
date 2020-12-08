const pool = require('../utils/pool');

module.exports = class Chat {
    meetingId;
    teacherId;
    timestamp;
    speaker;
    text;

    constructor(row) {
        this.id = row.id;
        this.meetingId = row.meetingId;
        this.teacherId = row.teacherId;
        this.timestamp = row.timestamp;
        this.speaker = row.speaker;
        this.text = row.text;
    }

    static async insert({ meetingId, teacherId, timestamp, speaker, text }) {
        try {
            const { rows } = await pool.query(
                `INSERT INTO chats 
            ( meetingId, teacherId, timestamp, speaker, text )
            VALUES($1, $2, $3, $4, $5)
            RETURNING * `,
                [meetingId, teacherId, timestamp, speaker, text]);

            return new Chat(rows[0]);
        } catch (e) {
            console.log('ERROR')
            throw new Error(e)
        }
    }

    static async find() {
        const { rows } = await pool.query(`SELECT * FROM chats 
        ORDER BY id ASC`);
        return rows.map(row => new Chat(row));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM chats WHERE id = $1`,
            [id]);

        if (!rows[0]) throw new Error(`No meeting with id ${id}`);

        return new Chat(rows[0]);
    }

    static async update(id, { meetingId, teacherId, timestamp, speaker, text }) {
        const { rows } = await pool.query(
            `UPDATE chats
            SET 
            meetingId = $1,
            teacherId = $2,
            timestamp = $3,
            speaker = $4,
            text = $5
            WHERE id = $6
            RETURNING * `,
            [meetingId, teacherId, timestamp, speaker, text, id]);

        return new Chat(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM chats WHERE id=$1 RETURNING *',
            [id]);

        return new Chat(rows[0]);
    }
}