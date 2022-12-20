var map = L.map('map', {dragging: !L.Browser.mobile}).setView([48.856614, 2.3522219], 8);

var tile = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

tile.addTo(map);

var pan = document.getElementById("pan");
var gen = document.getElementById("gen");

document.getElementById("gen").click();
document.getElementById("pan").onclick = function() {
    document.getElementById("map").style.cursor = "grab";
    map.off('click')
}

document.getElementById("gen").onclick = function() {
    document.getElementById("map").style.cursor = "crosshair";
    map.on('click', function(e) {
        {
            document.getElementById("loading").style.display = "block";
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
            if (text == "Intervalle de 10 minutes") {
                var text = "600,1200,1800,2400,3000,3600"
                var aff = 'Intervalle de 10'
            } else {
                var text = text.split(" ");
                var text = text[0] * 60
                var aff = text / 60
            }

            function getColor(d) {
                return d >= 3600 ? '#a8eb12' :
                       d >= 3000  ? '#a8eb12' :
                       d >= 2400  ? '#00e288' :
                       d >= 1800  ? '#00cce4' :
                       d >= 1200   ? '#00abff' :
                       d >= 600   ? '#007afc' :
                       d > 0   ? '#FED976' :
                                  '#FFEDA0';
            }
            function style(feature) {
                return {
                    fillColor: getColor(feature.properties.value),
                    weight: 4,
                    opacity: 1,
                    color: getColor(feature.properties.value),
                    fillOpacity: 0.2
                };
            }

            var greenIcon = new L.Icon({
                iconUrl: 'pin-m+7e7e7e@2x.png',
                iconSize: [31, 42],
                iconAnchor: [18, 34],
                popupAnchor: [20, 20],
            });
            request.onreadystatechange = function() {
                if (this.readyState === 4) {
                    data = this.responseText
                    console.log(data)
                    var layer = L.geoJSON(JSON.parse(data), {style: style}).addTo(map);

                    layer.addTo(map);
                    document.getElementById("loading").style.display = "none";
                    
                    function download_txt() {
                        var textToSave = data
                        var hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = `${Math.round(lat * 1000) / 1000}_${Math.round(lng * 1000) / 1000}.json`;
                        hiddenElement.click();
                        console.log(textToSave)
                      }
                      
                      document.getElementById('test').addEventListener('click', download_txt);
                }
            };

            const body = `{"locations":[[${String(lng)},${String(lat)}]],"range":[${String(text)}]}`;
            request.send(body);
            map.panTo(new L.LatLng(lat, lng));
            L.marker([lat, lng], {icon: greenIcon}).bindTooltip(`<b>Mode</b> : ${nom}<br><b>Latitude</b> : ${Math.round(lat * 1000) / 1000}<br><b>Longitude</b> : ${Math.round(lng * 1000) / 1000}`).addTo(map);
            document.getElementById("llat").innerHTML = `\xa0${Math.round(lat * 1000) / 1000}`
            document.getElementById("llng").innerHTML = `\xa0${Math.round(lng * 1000) / 1000}`
            var southWest = L.latLng(-89.98155760646617, -180),northEast = L.latLng(89.99346179538875, 180);
            var bounds = L.latLngBounds(southWest, northEast);
            map.setMaxBounds(bounds);
            map.on('drag', function() {map.panInsideBounds(bounds, {animate: false})});
        }
    })
}

var legend = L.control({position: "bottomleft"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4 style='margin-left:-2vh !important'>Temps de trajet</h4>";
    div.innerHTML += `<i style="background: #007afc"></i><span>15 minutes</span><br>`;
    div.innerHTML += '<i style="background:#00cce4"></i><span>30 minutes</span><br>';
    div.innerHTML += '<i style="background: #00e288"></i><span>45 minutes</span><br>';
    div.innerHTML += '<i style="background: #a8eb12"></i><span>60 minutes</span><br>';
    div.innerHTML += '<i style="background-color: red;background-image:linear-gradient(to right, #007afc 0%, #007afc 35%, #00abff 35%, #00abff 70%,#a8eb12 70%, #a8eb12 100%)"></i><span>Interv. 10 minutes</span><br>';
    return div;
};

legend.addTo(map);

document.getElementById("del").onclick = function() {
    var data;
    map.eachLayer(function(layer) {map.removeLayer(layer)});
    tile.addTo(map);
}

var geocoder = L.Control.geocoder({defaultMarkGeocode: false}).on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
    bbox.getSouthEast(),
    bbox.getNorthEast(),
    bbox.getNorthWest(),
    bbox.getSouthWest()]);
    map.fitBounds(poly.getBounds());
    map.setZoom(17)}).addTo(map);