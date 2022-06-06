// create map
var map22 = L.map("2_2", {
    center: [53.462, -2.22],
    zoom: 13,
    minZoom: 6,
    maxZoom: 15,
    zoomControl: true,
});

// add background basemap
var mapBaseLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
).addTo(map22);

// get vector tiles URL
var mapUrl = "https://urbangrammarai.xyz/great-britain/tiles/{z}/{x}/{y}.pbf";

// define styling of vector tiles
var vectorTileStyling = {
    signatures_combined_levels_clipped_4326: function(properties, zoom) {
        var fill = true;
        var weight = 0;
        if (properties.signature_type ==
            "2_2") {
            fill = false;
            weight = 1;
        }
        return ({
            fill: fill,
            weight: weight,
            color: "#ffffff",
            fillColor: "#000000",
            fillOpacity: 0.5,
            opacity: 1.0,
        });
    }
};

// map22.on('click', function(e) {
//     var lt = String(e.latlng.lat),
//         lg = String(e.latlng.lng);
//     var popup = L.popup()
//         .setLatLng(e.latlng)
//         .setContent(lt + " " + lg)
//         .openOn(map22);
// });


// define options of vector tiles
var mapVectorTileOptions = {
    rendererFactory: L.canvas.tile,
    interactive: true,
    attribution: '&copy; <a href="https://martinfleischmann.net">Martin Fleischmann</a>, <a href="https://darribas.org">Dani Arribas-Bel</a>, <a href="https://urbangrammarai.xyz">Urban Grammar AI research project</a>',
    maxNativeZoom: 15,
    minZoom: 6,
    vectorTileLayerStyles: vectorTileStyling,
};

// create VectorGrid layer and add popup to it
var mapPbfLayer = new L.VectorGrid.Protobuf(
    mapUrl, mapVectorTileOptions
);

// add VectorGrid layer to map
mapPbfLayer.addTo(map22);


// add scalebar
L.control.scale().addTo(map22);