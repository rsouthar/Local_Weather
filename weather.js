var APPID = "API Key Here";
var temp;
var loc;
var icon;
var max;
var min;
var desc;
var sunrise, sunset;
var weather = {};

function update(weather){
   temp.innerHTML = K2F(weather.temp) + "f";
   loc.innerHTML = weather.loc;
   icon.src = weather.code;
   max.innerHTML = K2F(weather.max);
   min.innerHTML = K2F(weather.min);
   desc.innerHTML = weather.desc;
   sunset = getTime(weather.sunset);
   sunrise = getTime(weather.sunrise);
   console.log(sunset);
   console.log(sunrise);
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

function showPosition(position) {
  updateByGeo(position.coords.latitude, position.coords.longitude);
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
      weather.temp = data.main.temp;
      weather.code = data.weather[0].id;
      weather.desc = data.weather[0].description;
      weather.max = data.main.temp_max;
      weather.min = data.main.temp_min;
      weather.sunset = data.sys.sunset;
      weather.sunrise = data.sys.sunrise;
      icon = document.getElementById("icon").className = "wi wi-owm-" +  weather.code;
      update(weather);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}
console.log();
// Add a zero to the minutes ex. 7:02 instead of 7:2
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getTime(sun) {
  var ts = new Date(sun * 1000);
  var hours = ts.getHours();
  if (hours > 12 && hours <= 24) {
    hours = ts.getHours() - 12;
  } else {
    hours = ts.getHours();
  }
  var minutes = addZero(ts.getMinutes());
  var time = hours + ":" + minutes;
  console.log(time);
  // get the current time
  var curTime = new Date();
  var h = curTime.getHours();
  var m = curTime.getMinutes();
  var c = h + ":" + m;

  if (c <= time) {
    return sunset.innerHTML = '<i class="wi wi-sunset"></i>' + " Sunset at " + time;
  } else {
    return sunset.innerHTML = '<i class="wi wi-sunrise"></i>' + " Sunrise at " + time;
  }
}

function setTempUnit(tempUnit) {

}


function K2F(k) {
  return Math.round(k*(9/5)-459.67) + String.fromCharCode(176);
}

function K2C(k) {
  return Math.round(k - 273.15) + String.fromCharCode(176);
}
