'use strict';

import { updateWeather, error404 } from "./weather.js";
const defaultLocation = "#/weather?lat=24.1425040&lon=120.6710790" //暫

const currentLocation = query => {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude, longitude } = res.coords;

        updateWeather(latitude, longitude);
    }, err => {
        window.location.hash = defaultLocation;
    });
}


/**
 * @param {string} query Searched query
 * 02:11:47
 */
const searchedLocation = query => updateWeather(...query.split("&"));
updateWeather("lat=24.142504092882096", "lon=120.67107909816465")

const routes = new Map ([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);
    const [route, query] = requestURL.includes ? requestURL.split("?"): [requestURL];

    routes.get(route)?routes.get(route)(query): error404();
}
window.addEventListener("hashchange", checkHash);
 
window.addEventListener("load", function(){
    if(!window.location.hash) {
        window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
})