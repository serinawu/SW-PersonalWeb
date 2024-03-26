'use strict';

import { fetchData, url } from "./api.js";
import * as module from "./module.js";

/** 2:10:15
 * Add event listener on multiple elements
 * @param {NodeList} elements Elements node array
 * @param {string} eventType Event Type e.g: "click", "mouseover"
 * @param {Function} callback Callback function
 */
const addEventOnElements = function(elements, eventType, callback) {
    for (const element of elements) element.addEventListener(eventType, callback);
}

/** 2:11:58
 * 切換手機版搜尋
 */
const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const toggleSearch = () => searchView.classList.toggle("active");

searchTogglers.forEach(toggler => {
    toggler.addEventListener("click", toggleSearch);
});

/** 02:13:13
 * 搜尋列
 */
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeout = null;
const searchTimeoutDuration = 500;

searchField.addEventListener("input", function(){
    searchTimeout ?? clearTimeout(searchTimeout);

    if(!searchField.value) {
        searchResult.classList.remove("active");
        searchResult.innerHTML = "";
        searchField.classList.remove("searching");
    } else {
        searchField.classList.add("searching");
    }

    if (searchField.value){
        searchTimeout = setTimeout(() => {
            fetchData(url.geo(searchField.value), function(locations) {
                searchField.classList.remove("searching");
                searchResult.classList.add("active");
                searchResult.innerHTML = `
                <ul class="view-list" data-search-list></ul>
                `;

                const /**{NodeList} | [] */ items = [];
                for (const { name, lat, lon, country, state } of locations ) {
                    const searchItem = document.createElement("li");
                    searchItem.classList.add("view-item");

                    searchItem.innerHTML = `
                    <i class="fa-solid fa-location-dot"></i>
                    <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler>
                        <p class="item-title">${name}</p>
                        <p class="label-2 item-subtitle">${state || ""} ${country}</p>
                    </a>`;

                    searchResult.querySelector("[data-search-list]").appendChild(searchItem);
                    items.push(searchItem.querySelector("[data-search-toggler]"));
                }

                addEventOnElements(items, "click", function() {
                    toggleSearch();
                    searchResult.classList.remove("active");
                })
            });
        }, searchTimeoutDuration);
    }
});

// const container = document.querySelector("[data-container]");
const loading = document.querySelector("[data-loading]");
const currentLocationBtn = document.querySelector("[data-current-location-btn]");
// const errorContent = document.querySelector("[data-error-content]");

/**
 * 2:24:48
 * @param {number} lat 經
 * @param {number} lon 緯
 */
export const updateWeather = function(lat, lon) {
    loading.style.display = "grid";
    // container.style.overflowY = "hidden";
    // container.classList.contains("fade-in") ?? container.classList.remove("fade-in");
    // errorContent.style.display = "none";

    const currentWeatherSection = document.querySelector("[data-container]");
    const today = document.querySelector("[data-today-block]");
    //const highlightSection = document.querySelector("[data-highlights]"); //* xx-right
    //const hourlySection = document.querySelector("[data-hourly-forecast]"); // 
    //const forecastSection = document.querySelector("[data-5-day-forecast]"); // 2:28:15
    const aqiSection = document.querySelector("[data-airBlock]");

    currentWeatherSection.innerHTML = ``;
    highlightSection.innerHTML = ``;
    hourlySection.innerHTML = ``;
    forecastSection.innerHTML = ``;

    if (window.location.hash === "#/current-location") {
        currentLocationBtn.setAttribute("disabled", "");
    } else {
        // currentLocation.removeAttribute("disabled");
    }

    /**
     * 當前天氣
     */
    fetchData(url.currentWeather(lat, lon), function(currentWeather){
        const {
            weather,
            dt: dateUnix,
            sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
            main: { temp, feels_like, pressure, humidity },
            visibility,
            timezone
        } = currentWeather;
        const [{ description, icon }] = weather;
    
        const location_outer = document.querySelector("[data-current-location]");
        const current_data = document.createElement("span");
        current_data.classList.add("located");

        // current_data.innerText = `
        //     ${getDate(dateUnix, timezone)}
        // `;

        fetchData(url.reverseGeo(lat, lon), function([{name, country}]){
            current_data.querySelector("[data-location]").innerHTML = `
            ${getDate(name, country)}
            `
        });

        location_outer.appendChild(current_data);

        /**
         * Todays Highlight
         */
        fetchData(url.airPollution(lat, lon), function(airPollution){
            const [{
                main: { aqi },
                components: { no2, o3, so2, pm2_5 }
            }] = airPollution.list;

            //空氣品質
            const aqi_status = document.createElement("span");
            aqi_status.classList.add("aqi-status");
            aqi_status.innerText= `${aqi.level}`;

            //空氣細節(風速群組)
            const windSpeed_group = document.createElement("div");
            windSpeed_group.classList.add("wind_group");
            windSpeed_group.innerHTML= `
                <i class="fa-solid fa-wind"></i>
                <p data-wind-PM>
                    <span class="title-2">PM2.5</span>
                    ${Number(pm2_5)}
                </p>
                <p data-wind-SO2>
                    <span class="title-2">SO2</span>
                    ${Number(so2)}
                </p>
                <p data-wind-NO2>
                    <span class="title-2">NO2</span>
                    ${Number(no2)}
                </p>
                <p data-wind-O3>
                    <span class="title-2">O3</span>
                    ${Number(o3)}
                </p>
            `;
        });

        aqiSection.appendChild(aqi_status);
    });
}

export const error404 = function() {

}
