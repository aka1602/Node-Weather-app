const request =require('request');

var getWeather = (lat,lng,callback) =>{
  const request =require('request');
  request({
    url:`https://api.darksky.net/forecast/715118bbc519cfd8523ffb0447fba01c/${lat},${lng}`,
    json: true
  },(error, response, body)=>{
    if(!error && response.statusCode === 200 ){
  
    callback(undefined,{
      temperature: body.currently.temperature,
      apparentTemperature: body.currently.apparentTemperature
    });
    }else{
      callback('unable to fetch weather. ');
    }

  });

};

module.exports.getWeather =getWeather;
