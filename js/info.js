var satellite   = L.tileLayer(EsriNatGeoWorldMap = L.tileLayer(viz.leaflet.tiles.Esri.NatGeoWorldMap, { attribution: "'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'"})

, baseLayers = {"Esri NatGeoWorldMap": EsriNatGeoWorldMap
});

var map = L.map('map',{	center: [46.502577375093566, 2.5328517286224317],zoom: 5,layers: [EsriNatGeoWorldMap /*layers to show on load*/]});
