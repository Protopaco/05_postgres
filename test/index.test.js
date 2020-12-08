require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../index.js');
const pool = require('../lib/utils/pool.js')

describe('test insert', () => {
    beforeAll(async () => {
        await execSync('npm run setup-db');
    });

    afterAll(async () => {
        await pool.end();
    })

    it('inserts item into teachers db', async () => {
        const teacherObject = {
            "host_id": "host_id",
            "user_name": "user_name",
            "email": "email",
            "pic_url": "pic_url",
            "access_token": "access_token",
            "account_id": "account_id",
            "last_update": "last_update",
            "id": '1'
        }

        const returnObj = await fakeRequest(app)
            .post('/insert')
            .send(teacherObject);

        // console.log(returnObj);
        expect(returnObj.body).toEqual(teacherObject);
    })
})
