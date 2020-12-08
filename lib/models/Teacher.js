const { access } = require('fs');
const pool = require('../utils/pool');

module.exports = class Teacher {
    host_id;
    user_name;
    email;
    pic_url;
    access_token;
    account_id;
    last_update;

    constructor(row) {
        this.id = row.id;
        this.host_id = row.host_id;
        this.user_name = row.user_name;
        this.email = row.email;
        this.pic_url = row.pic_url;
        this.access_token = row.access_token;
        this.account_id = row.account_id;
        this.last_update = row.last_update;
    }

    static async insert({ host_id, user_name, email, pic_url, access_token, account_id, last_update }) {
        const { rows } = await pool.query(
            `INSERT INTO teachers 
            ( host_id, user_name, email, pic_url, access_token, account_id, last_update )
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING * `,
            [host_id, user_name, email, pic_url, access_token, account_id, last_update]);

        return new Teacher(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(`SELECT * FROM teachers 
        ORDER BY id ASC`);
        return rows.map(row => new Teacher(row));
    };

    static async findById(id) {
        const { rows } = await pool.query(
            `SELECT * FROM teachers WHERE id = $1`,
            [id]);

        if (!rows[0]) throw new Error(`No meeting with id ${id}`);

        return new Teacher(rows[0]);
    }

    static async update(id, { host_id, user_name, email, pic_url, access_token, account_id, last_update }) {
        const { rows } = await pool.query(
            `UPDATE teachers
            SET 
            host_id = $1,
            user_name = $2,
            email = $3,
            pic_url = $4,
            access_token = $5,
            account_id = $6,
            last_update = $7
            WHERE id = $8
            RETURNING * `,
            [host_id, user_name, email, pic_url, access_token, account_id, last_update, id]);

        return new Teacher(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM teachers WHERE id=$1 RETURNING *',
            [id]);

        return new Teacher(rows[0]);
    }
}