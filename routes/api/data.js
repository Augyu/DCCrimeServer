var express = require('express');
var router = express.Router();

require('dotenv').config();


/* postgresql connection */
const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL
const client = new Client({
  connectionString: connectionString,
  ssl: true
})
client.connect()
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const result = await client.query('SELECT * FROM dcrealcrime')
    res.json(result.rows)
    //client.end()
  } catch (err) {
    console.log(err.stack)
  }
});

router.get('/:startTime/:endTime/:location/:crimeType', async function(req, res){
  res.send(req.params)
})
// export const findEvent = (start, end ,location , type) => {
//   const result = await client.query('')
// }
module.exports = router;