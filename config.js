/** Common config for message.ly */

// read .env files and make environmental variables
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR 
    ? parseInt(process.env.BCRYPT_WORK_FACTOR, 10) 
    : 12;

module.exports = {
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
};
