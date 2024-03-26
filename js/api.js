

//weather API

'use strict';
export const weather_apiKey = "1cc8f9601e4be922f45c3135072dd21a";

export const url = {
    //當前天氣
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_apiKey}`
    },
    //近期天氣
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weather_apiKey}`
    },
    //空汙
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weather_apiKey}`
    },
    /**
     * 
     * @param {string} query Search query e.g "London", "New York"
     * @return
     */
    //取得當前地理位置
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${weather_apiKey}`
    }
}

/**
 * fetch data from sever
 * @param {string} URL API url
 * @param {function} callback callback
*/
export const fetchData = function(url, callback){
    console.log('Request URL:', url);
    fetch(url)
    .then(res => res.json())
    .then(data => callback(data));
}
