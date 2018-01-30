var APPID = "9e41248a89f22ccb8cbe479cb75311e6";
var temp;
var loc;
var icon;

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
      var weather = {};
      weather.loc = data.name + ", " + data.sys.country;
      weather.temp = K2F(data.main.temp);
      weather.icon = data.weather[0].id;
      update(weather);
      console.log(data);

    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function K2F(k) {
  return Math.round(k*(9/5)-459.67);
}

function K2C(k) {
  return Math.round(k - 273.15);
}

function update(weather){
   temp.innerHTML = weather.temp;
   loc.innerHTML = weather.loc;
   icon.src = "/owfont-regular.css/" + weather.icon + ".png";

}

function showPosition(position) {
  updateByGeo(position.coords.latitude, position.coords.longitude);
}

window.onload = function() {
  temp = document.getElementById("temp");
  loc = document.getElementById("location");
  icon = document.getElementById("icon");

  if(navigator.eolocation) { //fix this
    navigator.geolocation.getCurrentPosition(showPosition);
  }else {
    var zip = window.prompt("Enter ZIP Code");
    updateByZip(zip);
  }

}
