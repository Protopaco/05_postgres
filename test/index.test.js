require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../index.js');
const pool = require('../lib/utils/pool.js')

const testTeacherObject = {
    "host_id": "host_id",
    "user_name": "user_name",
    "email": "email",
    "pic_url": "pic_url",
    "access_token": "access_token",
    "account_id": "account_id",
    "last_update": "last_update",
    "id": '1'
}
const testUpdatedTeacherObject = {
    "host_id": "updated host_id",
    "user_name": "updated user_name",
    "email": "updated email",
    "pic_url": "updated pic_url",
    "access_token": "updated access_token",
    "account_id": "updated account_id",
    "last_update": "updated last_update",
    "id": '1'
}

describe('test insert', () => {
    beforeAll(async () => {
        await execSync('npm run setup-db');
    });

    afterAll(async () => {
        await pool.end();
    })

    it('inserts item into teachers db', async () => {


        const returnObj = await fakeRequest(app)
            .post('/insert')
            .send(testTeacherObject);

        // console.log(returnObj);
        expect(returnObj.body).toEqual(testTeacherObject);
    })

    it('returns all teachers from db', async () => {
        const returnObj = await fakeRequest(app).get('/find');
        // console.log(returnObj)
        expect(returnObj.body).toEqual([testTeacherObject])
    })

    it('returns one teacher by id', async () => {
        const returnObj = await fakeRequest(app).get('/find/1');
        expect(returnObj.body).toEqual(testTeacherObject)
    })

    it('returns updated teacher object', async () => {
        const returnObj = await fakeRequest(app)
            .put('/update/1')
            .send(testUpdatedTeacherObject)
        expect(returnObj.body).toEqual(testUpdatedTeacherObject)
    })
    it('deletes teacher object', async () => {
        const returnObj = await fakeRequest(app)
            .delete('/delete/1');
        expect(returnObj.body).toEqual(testUpdatedTeacherObject);
    })
})
