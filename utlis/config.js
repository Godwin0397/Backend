require('dotenv').config();

const mongodb_url = process.env.mongodb_url
const port = process.env.port
const JWT_SECRET = process.env.JWT_SECRET


module.exports = {
    mongodb_url,
    port,
    JWT_SECRET
}
