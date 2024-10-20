let btnXHR = document.getElementById('search');
let searchText = document.getElementById('city');
let searchResults = document.querySelector(".weather-info");

btnXHR.addEventListener("click", function() {
  searchResults.innerHTML = "";
  fetchWeatherAPI_UsingXHR(searchText.value);
});


function fetchWeatherAPI_UsingXHR(keyword) {
  if (!keyword) {
    return;
  }
  var url = "https://api.weatherapi.com/v1/forecast.json";
  const apiKey = "261c11a2d49b4b7a88d170146242010";
  var params = "key=" + apiKey + "&q=" + encodeURIComponent(keyword);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      processResponse(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", url + "?" + params);
  xhr.send();
}

function processResponse(resp) {
    searchResults.innerHTML= `
    <p>Current temperature: ${resp.current.temp_c}°C</p>
    <p>Highest temperature: ${resp.forecast.forecastday[0].day.maxtemp_c}°C</p>
    <p>Lowest temperature: ${resp.forecast.forecastday[0].day.mintemp_c}°C</p>
    <p>Wind speed: ${resp.current.wind_kph} k/h</p>`;
}