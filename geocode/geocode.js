const request = require('request');

var geocodeAddress = (address, callback)=>{
  var encodeAddress=encodeURIComponent(address);
 request({
   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress} &key=AIzaSyCKGrN0fiLRK8dDLeDQOdJMiNEYEtOveLU`,
   json: true
 },(error, response ,body)=>{
 if(error){
   callback('unable to connect to Google server');

 }
 else if(body.status === 'ZERO_RESULTS'){
   callback("unable to find that address");
 }
 else if(body.status==='OK'){
   callback(undefined,{
     address: body.results[0].formatted_address,
     latitude: body.results[0].geometry.location.lat,
     Longitude: body.results[0].geometry.location.lng
   });
 }
 });

};

module.exports.geocodeAddress = geocodeAddress;
//715118bbc519cfd8523ffb0447fba01c
