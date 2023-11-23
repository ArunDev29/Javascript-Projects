const apiKey = "d2594c37027d4a205d3a748dd406cfc1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) { // checking the weather
    const response = await fetch(apiUrl + city +  `&appid=${apiKey}`); // fetching the data 
    
    console.log(response.url); // fetching the full url in console.
    
    if(response.status == 404){ // if user enters wrong city name
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else { // if user enters correct city name
        let data = await response.json(); 

        console.log(data); // Printing the data in Json Format

        document.querySelector(".city").innerHTML = data.name + `[${data.sys.country}]`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" ;
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        //fetching the image based on the weather
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display= "block";
        document.querySelector(".error").style.display = "none";

    }
   
}

searchBtn.addEventListener("click", ()=> { //Fetching the city name from the search input box by button click
    checkWeather(searchBox.value);
})