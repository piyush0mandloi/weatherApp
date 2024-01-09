const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOuput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloutOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelector(".city");

let cityInput = "New Delhi";

cities.forEach((city) => {
    city.addEventListener("click",(e)=>{
        cityInput = e.target.innerHtml;
        fetchWeatherData();
        app.style.opacity = "0";
    })
});

form.addEventListener("submit",(e)=>{
    if(search.value.length ==0){
        alert("Please type in a city name")
    }
    else{
        cityInput=search.value;
        fetchWeatherData();
        search.value = ""
        app.style.opacity = "0"
    }
    e.preventDefault();
})

function dayoftheweek(day, month, year) {
    const weekday = [

        "Sunday" ,
        "Monday" ,
        "Tuesday" ,
        "wednesday" ,
        "Thursday" ,
        "Friday" ,
        "Saturday"
    ]
    
    return weekday[new Date(`${day}/${month}/${year}`).getDay()]
}
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=piyushmandloi474@gmail.com&q=${cityInput}&aqi=no
    `)
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        temp.innerHTML = data.current.temp_c + "&#176;"
        conditionOuput.innerHTML = data.current.condition.text;
        const date = data.location.localtime;
        const y = parseInt(data.substr(0,4));
        const m = parseInt(data.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${dayoftheweek(d, m, y)} ${d}/${m}/${y}`;
        timeOutput.innerHTML = time;
        nameOutput.innerHTML = date.location.name;

        icon.src = data.current.condition.icon;

        cloutOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";


        let timeofDay = "day";
        const code = data.current.condition.code;
        if(!data.current.is_day){
            timeofDay = "night";
        }


        if(code == 1000){
            app.style.backgroundImage = `url(./images/${timeofDay}/clear.jpg)`;
            btn.style.background = "#e5ba92"
        }

        app.style.opacity ="1"
    })
}