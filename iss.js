const request = require('request')
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */


 const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  let url = 'https://api.ipify.org?format=json';

  console.log('url',url);
  request(url, (error, response, body) => {
      
        
    if (error)    {                                 
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      
      callback(error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    } 
    console.log(body);
    const data = JSON.parse(body);
    console.log("data", data);
    callback(null, data.ip);
      
  });
};

const fetchCoordsByIP = function(ip, callback) {
  //takes in an IP address and returns the latitude and longitude
  let geoUrl = `https://freegeoip.app/json/`
  request(geoUrl, (error, response, body) => {
    
    
    if (error) {                                       
      callback(error, null);
      return;
    }
      
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`
      callback(Error(msg), null);
      return; 
    } 

    const coords = JSON.parse(body);
    const results = {latitude: coords.latitude, longitude: coords.longitude};
    callback(null, results);
  
  })
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  let stationUrl = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`
  
  request(stationUrl, (error, response, body) => {

    if (error) {
      callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
      callback(Error(msg), null);
      return; 
    } 

    const passes = JSON.parse(body).response;
    callback(null, passes)
  })
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, nextPasses);
      })
    })
  })
}
module.exports = {
  //fetchMyIP, 
  //fetchCoordsByIP, 
  //fetchISSFlyOverTimes,
  nextISSTimesForMyLocation };