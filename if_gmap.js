/* Code based on Google Map APIv3 Tutorials */


var gmapdata;
var gmapmarker;
var gmapmarker2;

var def_zoomval = 15;
var def_longval = 120.994260;
var def_latval = 14.593999;

function formatnumber(num, decimalctr) {
        var i;
        var factorval;
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
                num = "0";
        sign = (num == (num = Math.abs(num)));
        i = 0;
        factorval = 1;
        while (i < decimalctr) {
                factorval = factorval*10;
                i = i + 1;
        }
        num = Math.floor(num*factorval+0.50000000001);
        cents = num%factorval;
        num = Math.floor(num/factorval).toString();
        if(cents<10)
                cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
                num = num.substring(0,num.length-(4*i+3))+','+
        num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
}

function if_gmap_getdistance()
{
// from http://www.movable-type.co.uk/scripts/latlong.html
        var radfactorval = 3.1459/180;
        var lat1 = document.getElementById("latval").value;
        var lat2 = document.getElementById("latval2").value;
        var lon1 = document.getElementById("longval").value;
        var lon2 = document.getElementById("longval2").value;
	var R = 6371; // km
	var dLat = (lat2-lat1)*radfactorval;
	var dLon = (lon2-lon1)*radfactorval; 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.cos(lat1*radfactorval) * Math.cos(lat2*radfactorval) * 
	        Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c * document.getElementById("unittype").value;
	document.getElementById("distresult").innerHTML = formatnumber(d,2);
}

function if_gmap_checkicon()
{
	if (document.getElementById("red").checked==true) {
		gmapmarker.setIcon("red-dot.png");
		gmapmarker2.setIcon("blue.png");
	} else {
		gmapmarker.setIcon("red.png");
		gmapmarker2.setIcon("blue-dot.png");
	}
}

function if_gmap_init()
{
	var curpoint = new google.maps.LatLng(def_latval,def_longval);

	gmapdata = new google.maps.Map(document.getElementById("mapitems"), {
		center: curpoint,
		zoom: def_zoomval,
		mapTypeId: 'roadmap',
		apiKey: 'AIzaSyDiDDXi8q8sotA5c9dXie5JcFtnPZKSxI8'
		});

	gmapmarker2 = new google.maps.Marker({
					map: gmapdata,
					icon: 'blue.png',
					shadow: 'shadow.png',
					position: curpoint
				});

	gmapmarker = new google.maps.Marker({
					map: gmapdata,
					icon: 'red-dot.png',
					shadow: 'shadow.png',
					position: curpoint
				});

	google.maps.event.addListener(gmapdata, 'click', function(event) {
		if (document.getElementById("red").checked==true) {
			document.getElementById("longval").value = event.latLng.lng().toFixed(6);
			document.getElementById("latval").value = event.latLng.lat().toFixed(6);
			gmapmarker.setPosition(event.latLng);
		} else {
			document.getElementById("longval2").value = event.latLng.lng().toFixed(6);
			document.getElementById("latval2").value = event.latLng.lat().toFixed(6);
			gmapmarker2.setPosition(event.latLng);
		}
		//compute
		if_gmap_getdistance();
	});

	google.maps.event.addListener(gmapmarker, 'click', function() {
		document.getElementById("red").checked=true;
		if_gmap_checkicon();
		if_gmap_getdistance();
	});
	google.maps.event.addListener(gmapmarker2, 'click', function() {
		document.getElementById("blue").checked=true;
		if_gmap_checkicon();
		if_gmap_getdistance();
	});

	if_gmap_loadpicker(1);
/*
	document.getElementById("longval").value = def_longval;
	document.getElementById("latval").value = def_latval;
	document.getElementById("longval2").value = def_longval;
	document.getElementById("latval2").value = def_latval;
*/
	return false;
} // end of if_gmap_init


function if_gmap_loadpicker(type)
{
	var longval = document.getElementById("longval").value;
	var latval = document.getElementById("latval").value;

	if (type == 2) {
		longval = document.getElementById("longval2").value;
		latval = document.getElementById("latval2").value;
	}

	if (longval.length > 0) {
		if (isNaN(parseFloat(longval)) == true) {
			longval = def_longval;
		} // end of if
	} else {
		longval = def_longval;
	} // end of if

	if (latval.length > 0) {
		if (isNaN(parseFloat(latval)) == true) {
			latval = def_latval;
		} // end of if
	} else {
		latval = def_latval;
	} // end of if

	var curpoint = new google.maps.LatLng(latval,longval);

	if (type == 1) {
		document.getElementById("red").checked=true;
		gmapmarker.setPosition(curpoint);
	} else {
		document.getElementById("blue").checked=true;
		gmapmarker2.setPosition(curpoint);
	}

	gmapdata.setCenter(curpoint);
	//gmapdata.setZoom(zoomval);

	if_gmap_getdistance();
	return false;
} // end of if_gmap_loadpicker


