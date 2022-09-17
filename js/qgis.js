var map = L.map('map').setView([43.3269942, -0.8532809], 9);
var tile = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 22,
    subdomains: 'abcd',
    accessToken: 'cHwHz2jFd1k6blmFA6wnYur05s8mCVw6336l2GHmEEAWqvCNZ0dfQMazW83EJUHw'
});
tile.addTo(map);

var polystyle = {
    "color": "#363636",
    "weight": 2,
    "opacity": 1,
    "fillOpacity": 0.1
};

function getColor(d) {
    return d > 1000 ? '#800026' :
        d >= 5 ? '#fde725' :
        d >= 4 ? '#5dc963' :
        d >= 3 ? '#21908d' :
        d >= 2 ? '#3b528b' :
        d >= 1 ? '#440154' :
        d > 0 ? '#FED976' :
        '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.DN),
        weight: .5,
        opacity: 1,
        color: getColor(feature.properties.DN),
        fillOpacity: 0.9
    };
}


var layerGroup = $.getJSON("file/FILE.geojson", function(data) {
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<p>' + feature.properties.DN + '/5</p>')},
        style: style}).addTo(map)});

var res = $.getJSON("file/RES.geojson", function(lay) {
    L.geoJSON(lay, {
        onEachFeature: function(feature, layer) {
            layer.bindTooltip('<p>' + feature.properties.voltage / 1000 + ' kV</p>', {
                sticky: true})},style: polystyle}).addTo(map)});


var legend = L.control({position: "bottomleft"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4 style='margin-left:-0.5vh'>Note de l'analyse</h4>";
    div.innerHTML += `<i style="background: #440154;"></i><span id="test">1</span><br>`;
    div.innerHTML += '<i style="background:#3b528b  "></i><span id="test">2</span><br>';
    div.innerHTML += '<i style="background: #21908d"></i><span id="test">3</span><br>';
    div.innerHTML += '<i style="background: #5dc963"></i><span id="test">4</span><br>';
    div.innerHTML += '<i style="background: #fde725"></i><span id="test">5</span><br>';
    div.innerHTML += '<i style="background: #282828; height:3px;margin-top:.6rem"></i><span id="test">Réseau électrique</span><br>';
    return div;
};

legend.addTo(map);