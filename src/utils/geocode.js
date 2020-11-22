const request = require('request')
const geoCode = (address,callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGF1bHNvdW1lbjc2IiwiYSI6ImNraHB0dHZvZDAzOGsyc21zdDVtc2x1NDEifQ.2uBdf09u_6G0bHeRCLV5Ag&limit=1'
    request({url:geoCodeUrl,json:true},(error,{body}={}) => {
        if(error){
            callback("Unable to connect Geocoding service",undefined)
        } else if(body.features.length === 0){
            callback("Location is not found",undefined)
        } else {
            
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })     
        }
    })
}

module.exports = geoCode