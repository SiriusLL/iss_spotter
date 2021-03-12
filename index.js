//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);

  
// });


// fetchCoordsByIP(ip, (error, coords) => {
//   if (error) {
//     console.log("It didnt'work!" , error);
//     return;
//   }

//   console.log("It worked!!")
//   console.log('the coords are', coords);

  
// });

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(coords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("it worked!, returned flyover times:", passTimes);
// });
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(pass.duration);
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("it didn't work!", error);
  }

  printPassTimes(passTimes);
})