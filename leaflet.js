var map = L.map('map',{ dragging: !L.Browser.mobile }).setView([48.856614, 2.3522219], 8);

L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	minZoom: 0,
	maxZoom: 22,
	subdomains: 'abcd',
	accessToken: 'cHwHz2jFd1k6blmFA6wnYur05s8mCVw6336l2GHmEEAWqvCNZ0dfQMazW83EJUHw'
}).addTo(map);

var pan = document.getElementById("pan");
var gen = document.getElementById("gen");

document.getElementById("gen").click();
document.getElementById("pan").onclick= function(){
    document.getElementById("map").style.cursor="grab";
    map.off('click')
}

document.getElementById("gen").onclick= function(){
    document.getElementById("map").style.cursor="crosshair";
var layer;
map.on('click', function(e) {
    {
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
    if (text == "Intervalle de 10 minutes"){
        var text = "600,1200,1800,2400,3000,3600"
        var aff = 'Intervalle de 10'
    }
    else {var text = text.split(" ");
        var text = text[0]*60
        var aff = text/60
    }

    var couleur;
    if (aff == 15){
        couleur = "#4D96FF"
    } else if (aff == 30){
        couleur = "#6BCB77"
    } else if (aff == 45){
        couleur = "#FFD93D"
    } else if (aff == 60){
        couleur = "#FF6B6B"
    } else{ couleur = "#4dcfdb"}
    
    var polystyle = {
        "color": couleur,
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
            var layer = L.geoJSON(JSON.parse(data), {style:polystyle}).addTo(map);
            layer.addTo(map);

        }
    };
    
    const body = `{"locations":[[${String(lng)},${String(lat)}]],"range":[${String(text)}]}`;
    request.send(body);
    map.panTo(new L.LatLng(lat, lng));
    L.marker([lat, lng], {icon:greenIcon}).bindTooltip(`<b>Mode</b> : ${nom}<br><b>Latitude</b> : ${Math.round(lat * 1000) / 1000}<br><b>Longitude</b> : ${Math.round(lng * 1000) / 1000}`).addTo(map);
    document.getElementById("llat").innerHTML = `\xa0${Math.round(lat * 1000) / 1000}`
    document.getElementById("llng").innerHTML = `\xa0${Math.round(lng * 1000) / 1000}`
    var southWest = L.latLng(-89.98155760646617, -180),
    northEast = L.latLng(89.99346179538875, 180);
    var bounds = L.latLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });

    

});
}})}

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4 style='margin-left:-2vh !important'>Temps de trajet</h4>";
  div.innerHTML += `<i style="background: #4D96FF"></i><span>15 minutes</span><br>`;
  div.innerHTML += '<i style="background:#6BCB77"></i><span>30 minutes</span><br>';
  div.innerHTML += '<i style="background: #FFD93D"></i><span>45 minutes</span><br>';
  div.innerHTML += '<i style="background: #FF6B6B"></i><span>60 minutes</span><br>';
  div.innerHTML += '<i style="background: #4dcfdb"></i><span>Interv. 10 minutes</span><br>';

  return div;
};

legend.addTo(map);


document.getElementById("del").onclick = function(){
    window.location.reload();
}

