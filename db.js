const { Client } = require("pg");

let DB_URI;
if (process.env.NODE_ENV === "test") {
    DB_URI = process.env.TEST_DATABASE_URL;
} else {
    DB_URI = process.env.DATABASE_URL;
}

const client = new Client({
    connectionString: DB_URI
});

console.log(DB_URI);
client.connect();

module.exports = client;
