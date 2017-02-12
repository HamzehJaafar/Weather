
var checked = 0;
var days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function getWeather() {
	
    var city = document.getElementById('city').value;
	
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=fea414912003e92ac5a906e22d75e5e8";
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			
			var obj = JSON.parse(xmlhttp.responseText)
			document.getElementById("name").innerHTML = "Weather for: " + obj.name;
			
			document.getElementById("imgWeather").src = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";;
			document.getElementById("wind").innerHTML =  obj.wind.speed + "m/s"
			document.getElementById("humid").innerHTML =  obj.main.humidity + "%"
			document.getElementById("pressure").innerHTML =  obj.main.pressure + " hPa"
			getForecast();
			temperature(obj.main.temp);
	}
}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function temperature(kelvins) {
	var fahr = (kelvins * 9 / 5) - 459.67;
    var cels = (kelvins - 273.15);
	if (checked == 0){
		document.getElementById("temp").innerHTML = cels.toFixed(1) + " &degC";
	document.getElementById("swap").innerHTML = " &degF";
	} else {
		document.getElementById("temp").innerHTML = fahr.toFixed(0) + " &degF";
	document.getElementById("swap").innerHTML = " &degC";	
	}
	
}

function forecastTemp(kelvins) {
	var fahr = (kelvins * 9 / 5) - 459.67;
    var cels = (kelvins - 273.15);
	if (checked == 0){
	return cels;
	document.getElementById("swap").innerHTML = " &degF";
	} else {
	return fahr;
	document.getElementById("swap").innerHTML = " &degC";	
	}
		
}

function swap(){
	
	if (checked == 1){
		checked = 0;
				document.getElementById("swap").innerHTML = " &degF";
	} else {
		checked = 1;
		document.getElementById("swap").innerHTML = " &degC";
	}
	getWeather();
}

function getForecast() {
	
    var city = document.getElementById('city').value;
	
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=fea414912003e92ac5a906e22d75e5e8";
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {			
			var forecast = JSON.parse(xmlhttp.responseText)
			var d = new Date(forecast.list[0].dt_txt)
			difference = (24 - d.getHours()) / 3;
			if (difference > 5) {
				difference = 0;
			}
			var count = 0;
			for (i = 1; i < 6; i++) {
				var c = new Date(forecast.list[difference+count].dt_txt);
			
				document.getElementById("day"+i+"date").innerHTML = days[c.getDay()];
				document.getElementById("day"+i+"img").src = "http://openweathermap.org/img/w/" + forecast.list[difference+count].weather[0].icon + ".png";;
			
				if (checked == 1) {		
				document.getElementById("day"+i+"temp").innerHTML = forecastTemp(forecast.list[difference+count].main.temp_max).toFixed(1) + " &degF"
				} else {
				document.getElementById("day"+i+"temp").innerHTML = forecastTemp(forecast.list[difference+count].main.temp_max).toFixed(1) + " &degC"
			
				}count += 8;
			}
			
		
			for (j = 1; j < 9; j++)
			{
			
				var intervaldate = new Date(forecast.list[j].dt_txt);
				
				document.getElementById("hour"+j).innerHTML = intervaldate.getHours() + ":00";
				
				document.getElementById("hour"+j+"humid").innerHTML = forecast.list[j-1].main.humidity + "%";
				document.getElementById("hour"+j+"wind").innerHTML = forecast.list[j-1].wind.speed.toFixed(2) ;
				
				if (checked == 1) {		
				document.getElementById("hour"+j+"temp").innerHTML = forecastTemp(forecast.list[j-1].main.temp).toFixed(1)+ " &degF";
				} else {
				document.getElementById("hour"+j+"temp").innerHTML = forecastTemp(forecast.list[j-1].main.temp).toFixed(1)+ " &degC";
				
				}
			}
			
	}
}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

getWeather()