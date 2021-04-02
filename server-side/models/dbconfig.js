const { Pool } = require('pg')

const db = {
    host: 'ec2-54-205-183-19.compute-1.amazonaws.com',
    database: 'd48fq7n0mg7i9e',
    user: 'sqbyfdwqawjmoh',
    port: 5432,
    password: 'acdaec18d3018d268221bfcc14d9e6fc8fc323b2038d0b0f416fc6e2c7a81c39',
    ssl: true
}

const connect = () => { 
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    return new Pool(db) 
}

module.exports = connect