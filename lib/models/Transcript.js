const pool = require('../utils/pool');

module.exports = class Transcript {
    meetingId;
    teacherId;
    identifier;
    start;
    end;
    text;
    styles;

    constructor(row) {
        this.id = row.id;
        this.meetingId = row.meetingId;
        this.teacherId = row.teacherId;
        this.identifier = row.identifier;
        this.start = row.start;
        this.end = row.end;
        this.text = row.text;
        this.styles = row.styles;
    }

    static async insert({ meetingId, teacherId, identifier, start, end, text, styles }) {
        try {
            const { rows } = await pool.query(
                `INSERT INTO transcripts 
            ( meetingId, teacherId, identifier, start, end, text, styles )
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING * `,
                [meetingId, teacherId, identifier, start, end, text, styles]);

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

    static async update(id, { meetingId, teacherId, identifier, start, end, text, styles }) {
        const { rows } = await pool.query(
            `UPDATE transcripts
            SET 
            meetingId = $1,
            teacherId = $2,
            identifier = $3,
            start = $4,
            end = $5,
            text = $6,
            styles = $7
            WHERE id = $8
            RETURNING * `,
            [meetingId, teacherId, identifier, start, end, text, styles, id]);

        return new Transcript(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM transcripts WHERE id=$1 RETURNING *',
            [id]);

        return new Transcript(rows[0]);
    }
}