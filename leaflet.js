var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);


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

    coordonnees = document.getElementById("coordonnées").value
    incr = document.getElementById("test").value


}


