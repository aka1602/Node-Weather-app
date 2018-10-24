
const yargs= require('yargs');
const axios=require('axios');
const argv =yargs
.option(
  {
    a:{
      demand : true,
      alias : 'address',
      Describe : 'Address to fetch weather for',
      string : true
    }
  }).help().alias('help','h').argv;

  var encodeAddress=encodeURIComponent(argv.address);
  var geocodeUrl= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyCKGrN0fiLRK8dDLeDQOdJMiNEYEtOveLU`;
  axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('unable to find address');
    }
    var lat=response.data.results[0].geometry.location.lat;
    var lng=response.data.results[0].geometry.location.lng;
    var weatherUrl= `https://api.darksky.net/forecast/715118bbc519cfd8523ffb0447fba01c/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response)=>{
    var temperature =response.data.currently.temperature;
    var apparentTemperature=response.data.currently.apparentTemperature;
    console.log(`it's currntly${temperature}.It feels like ${apparentTemperature}.`);
  }).catch((e)=>{
    if(e.code === 'ENOTFOUND'){
      console.log('unabale to connect to api server');
    }else{
      console.log(e.message);
    }

  });
