const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const secret = process.env.DB_SECRET;

module.exports = {
  mongoURI: `mongodb://${username}:${password}@${host}.com:${port}/${name}`,
  secretOrKey: `${secret}`,
};