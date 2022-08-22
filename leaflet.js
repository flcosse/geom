var map = L.map('map').setView([48.856614, 2.3522219], 10);

L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'cHwHz2jFd1k6blmFA6wnYur05s8mCVw6336l2GHmEEAWqvCNZ0dfQMazW83EJUHw'
}).addTo(map);

map.on('click', function(e) {

    const velo = document.getElementById("velo");
    const voiture = document.getElementById("voiture");
    const pieds = document.getElementById("pieds");
    let mode;
    let nom;
    if (velo.checked == true) {
        mode = "cycling-regular"
        nom = "Vélo"
    } else if (voiture.checked == true) {
        mode = "driving-car"
        nom = "Voiture"
    } else if (pieds.checked == true) {
        mode = "foot-walking"
        nom = "À pieds"
    }

    
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    let request = new XMLHttpRequest();
    var llat = document.getElementById("lat");
    
    request.open('POST', `https://api.openrouteservice.org/v2/isochrones/${mode}`);

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248df22650771d94c06a73d6fb78ba4706b');
    var e = document.getElementById("ddlViewBy");

    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    var text = text.split(" ")

    var polystyle = {
        "color": "#497bff",
        "weight": 3,
        "opacity": 1,
        "fillOpacity":0.1
    };

    var greenIcon = new L.Icon({
        iconUrl: 'pin.png',
        iconSize: [35, 35],
        iconAnchor: [17, 29],
        popupAnchor: [20, 20],
      });

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            var data = this.responseText
            L.geoJSON(JSON.parse(data), {style:polystyle}).bindTooltip(`<b>Temps</b> : ${text[0]} minutes`,{sticky: true}).addTo(map);
        }
    };
    
    const body = `{"locations":[[${String(lng)},${String(lat)}]],"range":[${String(text[0]*60)}]}`;
    request.send(body);
    map.panTo(new L.LatLng(lat, lng));
    L.marker([lat, lng], {icon:greenIcon}).bindTooltip(`<b>Mode</b> : ${nom}<br><b>Latitude</b> : ${Math.round(lat * 1000) / 1000}<br><b>Longitude</b> : ${Math.round(lng * 1000) / 1000}`).addTo(map);
    document.getElementById("llat").innerHTML = `\xa0${Math.round(lat * 1000) / 1000}`
    document.getElementById("llng").innerHTML = `\xa0${Math.round(lng * 1000) / 1000}`
});