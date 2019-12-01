var express = require('express');
var router = express.Router();

require('dotenv').config();


/* postgresql connection */
const { Client } = require('pg')
const connectionString = process.env.HEROKU_POSTGRESQL_URL
const client = new Client({
  connectionString: connectionString,
  ssl: true
})
client.connect()
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const result = await client.query('SELECT x, y, report_dat, tweet_text, dcrealcrime.gioffense, is_twitter FROM dcrealcrime LEFT JOIN twitterdata ON dcrealcrime.octo_record_id2 =  twitterdata.octo_record_id')
    res.json(result.rows)
    //client.end()
  } catch (err) {
    console.log(err.stack)
  }
});

router.get('/:startTime/:endTime/:location/:crimeType', async function(req, res){
  res.send(req.params)
})
// location to lat and long
const reverseGeocode = (location) => {
  axios
      .get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+process.env.REACT_APP_GOOGLE_API)
      .then(data => this.setState({ latAndLong: data}))
      .catch(err => {
        console.log(err);
        return null;
      })
}
// const findEvent = (start, end, lat, long, type) => {
//   const result = await client.query('')
// }
module.exports = router;