var APPID = "Put Weather API Here";
var temp;
var loc;
var icon;
var max;
var min;
var desc;
var sunset;
var tempC;
var tempF;
var weather = {};

function update(weather){
   temp.innerHTML = weather.temp;
   loc.innerHTML = weather.loc;
   icon.src = weather.code;
   max.innerHTML = weather.max;
   min.innerHTML = weather.min;
   desc.innerHTML = weather.desc;
   sunset.innerHTML = weather.sunset;
}

window.onload = function(weather) {
  temp = document.getElementById("temp");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");
  max = document.getElementById("max");
  min = document.getElementById("min");
  desc = document.getElementById("desc");
  sunset = document.getElementById("sunset");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }else {
    var zip = window.prompt("Enter ZIP Code");
    updateByZip(zip);
  }

  var BgArray = ['one', 'two','three','four','five','six'];
  var num = Math.floor(Math.random() * 6);
  var path = document.getElementById("whole");

  path.classList.add(BgArray[num]);

}

function updateByZip(zip) {
  var url = "https://api.openweathermap.org/data/2.5/weather?" + "zip=" + zip + "&APPID=" + APPID;
    sendRequest(url);
}

function  updateByGeo(lat, lon) {
  var url = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      weather.loc = data.name + ", " + data.sys.country;
      tempC = Math.round(data.main.temp - 273.15) + String.fromCharCode(176);
      tempF = Math.round(data.main.temp*(9/5)-459.67) + String.fromCharCode(176);
      weather.temp = tempF;
      weather.code = data.weather[0].id;
      weather.desc = data.weather[0].description;
      weather.max = K2F(data.main.temp_max);
      weather.min = K2F(data.main.temp_min);
      weather.sunset = getTime(data.sys.sunset);
      icon = document.getElementById("icon").className = "wi wi-owm-" +  weather.code;
      update(weather);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}

function getTime(t) {
  var ts = new Date(t * 1000);
  var hours = ts.getHours() - 12;
  var minutes = ts.getMinutes();
  var time = '<i class="wi wi-sunset"></i>' + " Sunset at " + hours + ":" + minutes;
  return time;
}

function K2F(k) {
  return Math.round(k*(9/5)-459.67);
}

function K2C(k) {
  return Math.round(k - 273.15);
}

function showPosition(position) {
  updateByGeo(position.coords.latitude, position.coords.longitude);
}
