let input=document.querySelector("input");
const button=document.querySelector("button");

function changeIcon(currentWeather){
    let img=document.querySelector("#logo");
    img.src=`images/${currentWeather}.png`;

}
function humanReadableTime(unixTime){
    const date=new Date(unixTime*1000); //to convert to ms

    const hours=date.getUTCHours(); //UTC returns hours according to GMT
    const minutes=date.getUTCMinutes();
    const secs=date.getUTCSeconds();

    return `${hours}:${minutes}:${secs}`;
}

button.addEventListener("click",async ()=>{
if(input.value==""){
    alert("Enter valid location");
}

//fetching geolocation
const apiKey = "04ebb687cfaefbbf57b65abdcdd3b1fa";
const limit="1";
const geo=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=${limit}&appid=${apiKey}`);
const geoData=await geo.json();
console.log(geoData);

//fetching weather
const latitude=geoData[0].lat;
const longitude=geoData[0].lon;
const weather=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
const weatherData=await weather.json();
console.log(weatherData);

//updating weather
const location=document.getElementById("location");
location.innerText="  "+input.value;

const temp=document.getElementById("temp");
temp.innerText="Current Temperature: "+ (weatherData.main.temp-273.15).toFixed(2) + "°C";

const maxTemp=document.querySelector("#max-temp p");
maxTemp.innerText=(weatherData.main.temp_max-273.15).toFixed(2) + "°C";

const minTemp=document.querySelector("#min-temp p");
minTemp.innerText=(weatherData.main.temp_min-273.15).toFixed(2) + "°C";

const humidity=document.querySelector("#humidity p");
humidity.innerText=(weatherData.main.humidity).toFixed(2) + " %";

const wind=document.querySelector("#wind p");
wind.innerText=(weatherData.wind.speed).toFixed(2) + " m/s";

const pressure=document.querySelector("#pressure p");
pressure.innerText=(weatherData.main.pressure).toFixed(2) + " hPa";

const visibility=document.querySelector("#visibility p");
visibility.innerText=(weatherData.visibility).toFixed(2) + " m";

const sunrise=document.querySelector("#sunrise p");
sunrise.innerText=(humanReadableTime(weatherData.sys.sunrise)) + " GMT";

const sunset=document.querySelector("#sunset p");
sunset.innerText=(humanReadableTime(weatherData.sys.sunset)) + " GMT";

//changing icon
changeIcon(weatherData.weather[0].main);

//changing container background
const currentUTC=new Date();
const currentUTChours=currentUTC.getUTCHours();

const offsetHours=`${weatherData.timezone}`/3600;

const currentLocalHours=currentUTChours+offsetHours;
console.log(currentLocalHours);
if(currentLocalHours>=18 || currentLocalHours>=0 && currentLocalHours<=6){
    const imgNight="images/night.jpg";
    document.body.style.backgroundImage=`url("${imgNight}")`;
}
else{
    const imgDay="images/day.png";
    document.body.style.backgroundImage=`url("${imgDay}")`;
}
});