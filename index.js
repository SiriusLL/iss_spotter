const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("It didnt'work!" , error);
      return;
    }
  
    console.log("It worked!!")
    console.log('the coords are', coords);
  
    fetchISSFlyOverTimes(coords, (error, passTimes) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
  
      console.log("it worked!, returned flyover times:", passTimes);
    });
  });
});






