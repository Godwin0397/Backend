require('dotenv').config();

const mongodb_url = process.env.mongodb_url
const port = process.env.port


module.exports = {
    mongodb_url,
    port
}
