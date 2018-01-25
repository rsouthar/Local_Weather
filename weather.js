var temp;
var loc;

function update(weather){
   temp.innerHTML = weather.temp;
   loc.innerHTML = weather.loc;
}

window.onload = function() {
  temp = document.getElementById("temp");
  loc = document.getElementById("location");

  var weather = {};
    weather.temp = 60;
    weather.loc = "Ocean Springs";

  update(weather);
}
