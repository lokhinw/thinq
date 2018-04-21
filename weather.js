const axios = require('axios')
const appid = '78cdbbefadd06ab13d8e9bc2ddcf25d0'


const getWeather = (q) => {

  q.substring(q.toLowerCase().indexOf("weather in ") + 11)
    return axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q,
        appid,
        units: 'imperial'
      }
    })
    .then(({ data }) => {
      const compassSectors = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

      return 'Location: ' + data.name + ', ' + data.sys.country
      +'\nTemperature: ' + data.main.temp + '°F'
      +'\nSunrise: ' + convertUnixTime(data.sys.sunrise)
      +'\nSunset: ' + convertUnixTime(data.sys.sunset)
      +'\nWind Direction: ' + compassSectors[Math.round(data.wind.deg / 22.5)]
      +'\nWind Speed: ' + data.wind.speed + ' m/h'
      +'\nPressure: ' + data.main.pressure + ' mb'
      +'\nHumidity: ' + data.main.humidity + '%';
    })
}
const convertUnixTime = (unixTime) => {
  let date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  //let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2)/* + ':' + seconds.substr(-2)*/;
  return formattedTime;
}

module.exports = getWeather
