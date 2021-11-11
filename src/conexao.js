const { Pool } = require('pg');

const pool = new Pool({
    user: 'uyprvbnmtecfhu',
    host: 'ec2-44-199-85-33.compute-1.amazonaws.com',
    database: 'desu4gs8s2lle1',
    password: '48a60c4fe0a55e1d6a3ec58fbdae27916d6589936ea4d4ca73d5f1b59518c24e',
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = {
    query
}