let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
const search = document.querySelector(".search .input input");
const btn = document.querySelector(".search .btn button");
const weatherIcon = document.querySelector(".ia");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
const API_key = "90cbe1cd8d42aa7842e6f1e333bd9b1b";

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=90cbe1cd8d42aa7842e6f1e333bd9b1b`)
    .then(res => res.json())
    .then((data) => {
      showWeather(data[0].name);
    });
}

function showError(error) {
  console.error("Error getting location:", error);
}

getLocation();
function showWeather(town) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=90cbe1cd8d42aa7842e6f1e333bd9b1b&units=metric`)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      city.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp) + "°C";
      humidity.innerHTML = data.main.humidity + "%";
      wind.innerHTML = data.wind.speed + " km/h";
      document.querySelector(".type").innerHTML=data.weather[0].main;
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      }
      else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      }
      else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      }
      else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/Snow.png";
      }
    })
}
btn.addEventListener("click", () => {
  showWeather(search.value);
})

const year=new Date().getFullYear();
console.log(year);
const change=document.querySelector(".footer").innerHTML+` ${year}`;
document.querySelector(".footer").innerHTML=change;

