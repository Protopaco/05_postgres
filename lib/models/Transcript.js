const pool = require('../utils/pool');

module.exports = class Transcript {
    meetingId;
    teacherId;
    c_identifier;
    start_ts;
    end_ts;
    text;
    styles;

    constructor(row) {
        this.id = row.id;
        this.meetingId = row.meetingId;
        this.teacherId = row.teacherId;
        this.c_identifier = row.c_identifier;
        this.start_ts = row.start_ts;
        this.end_ts = row.end_ts;
        this.text = row.text;
        this.styles = row.styles;
    }

    static async insert({ meetingId, teacherId, c_identifier, start_ts, end_ts, text, styles }) {
        try {
            const { rows } = await pool.query(
                `INSERT INTO transcripts 
            ( meetingId, teacherId, c_identifier, start_ts, end_ts, text, styles )
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING * `,
                [meetingId, teacherId, c_identifier, start_ts, end_ts, text, styles]);

            return new Transcript(rows[0]);
        } catch (e) {
            console.log('ERROR')
            throw new Error(e)
        }
    }

    static async find() {
        const { rows } = await pool.query(`SELECT * FROM transcripts 
        ORDER BY id ASC`);
        return rows.map(row => new Transcript(row));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM transcripts WHERE id = $1`,
            [id]);

        if (!rows[0]) throw new Error(`No meeting with id ${id}`);

        return new Transcript(rows[0]);
    }

    static async update(id, { meetingId, teacherId, c_identifier, start_ts, end_ts, text, styles }) {
        const { rows } = await pool.query(
            `UPDATE transcripts
            SET 
            meetingId = $1,
            teacherId = $2,
            c_identifier = $3,
            start_ts = $4,
            end_ts = $5,
            text = $6,
            styles = $7
            WHERE id = $8
            RETURNING * `,
            [meetingId, teacherId, c_identifier, start_ts, end_ts, text, styles, id]);

        return new Transcript(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM transcripts WHERE id=$1 RETURNING *',
            [id]);

        return new Transcript(rows[0]);
    }
}