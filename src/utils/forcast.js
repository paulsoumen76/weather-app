const request = require('request')

const forcast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9e7b9b37a97cc9ef076dcff866f3228d&query=' + latitude + ',' + longitude 
    request({url,json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect weather service",undefined)
        } else if(body.error){
            callback("Unbale to find location",undefined)
        } else{

            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_desc = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined,weather_desc + ". it is currently "
                 + temperature + " degrees out. it feels like " + feelslike +
                " degrees out. " + "Humidity is " + humidity + ".")
        }
    }) 

}

module.exports = forcast