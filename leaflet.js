var map = L.map('map').setView([48.856614, 2.3522219], 10);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

map.on('click', function(e) {
    var coord = e.latlng;
    var lat = coord.lat;
    var lng = coord.lng;
    let request = new XMLHttpRequest();

    request.open('POST', "https://api.openrouteservice.org/v2/isochrones/driving-car");

    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248df22650771d94c06a73d6fb78ba4706b');

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };
    
    const body = `{"locations":[[${String(lng)},${String(lat)}]],"range":[300]}`;
    request.send(body);
    map.panTo(new L.LatLng(lat, lng));
    var marker = L.marker([lat, lng]).bindTooltip(`Centre de l'isochrone<br>Latitude : ${Math.round(lat * 1000) / 1000}<br>Longitude : ${Math.round(lng * 1000) / 1000}`).addTo(map);
});


document.getElementById("button").onclick = function() {

    const velo = document.getElementById("velo");
    const voiture = document.getElementById("voiture");
    const pieds = document.getElementById("pieds");
    let mode;
    if (velo.checked == true) {
        mode = "cycling-regular"
    } else if (voiture.checked == true) {
        mode = "driving-car"
    } else if (pieds.checked == true) {
        mode = "foot-walking"
    }
    incr = document.getElementById("test").value

}