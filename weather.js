if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert('Geolocation is not supported in your browser');
}

function showPosition(position) {
  var w = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

  $.getJSON(w, function(data){
    $(".location").html(data.name + ", " + data.sys.country);
    $("#temp").html(data.main.temp.toFixed(1));
  });

}
