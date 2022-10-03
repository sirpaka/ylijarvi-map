mapboxgl.accessToken = 'pk.eyJ1Ijoic2lycGFqIiwiYSI6ImNrczUyN3VlOTFqY2cydnBlMm5rd2RxMWwifQ.VKSQ5XXTdczbcfKep-qh2A';

//3D-kartan määrittelyä:

var map = new mapboxgl.Map({
    container: 'mapThreeD',
    zoom: 12.7,
    center: [27.882, 60.749],
    pitch: 90,
    bearing: 0,
    style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
});

const popup = new mapboxgl.Popup({
    offset: 45
}).setText(
    'Kisakeskus'
);

const marker1 = new mapboxgl.Marker({
        scale: 1.2
    })
    .setLngLat([27.908, 60.768])
    .setPopup(popup)
    .addTo(map);

map.on('load', () => {
    map.addSource('mapbox-dem', {

        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });

    map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 1.7
    });

    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 25
        }
    });


    map.addSource('kilpailumaasto', {
        type: 'geojson',
        data: 'map.geojson'
    });

    map.addLayer({
        'id': 'kilpailumaasto',
        'type': 'fill',
        'source': 'kilpailumaasto',
        'layout': {},
        'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.2
        }
    });

    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'kilpailumaasto',
        'layout': {},
        'paint': {
            'line-color': '#7FFF00',
            'line-width': 4
        }
    });
    map.on('click', 'kilpailumaasto', () => {
        new mapboxgl.Popup({
                offset: 30
            })
            .setLngLat([27.879, 60.751])
            .setHTML('Kilpailualue')
            .addTo(map);
    });
    map.on('mouseenter', 'kilpailumaasto', () => {
        map.getCanvas().style.cursor = 'pointer';
    });


    map.on('mouseleave', 'kilpailumaasto', () => {
        map.getCanvas().style.cursor = '';
    });



});

//"Maastokartan" määrittelyä:

const mapT = new mapboxgl.Map({
    container: 'mapTerrain',
    zoom: 11.2,
    center: [27.900, 60.757],
    pitch: 0,
    bearing: 0,
    style: 'mapbox://styles/mapbox/outdoors-v11'

});

const popupTerrain = new mapboxgl.Popup({
    anchor: 'left'
}).setText(
    'Kisakeskus'
);

const marker2 = new mapboxgl.Marker()
    .setLngLat([27.908, 60.768])
    .setPopup(popupTerrain)
    .addTo(mapT);

mapT.on('load', () => {
    mapT.addSource('kilpailumaasto', {
        type: 'geojson',
        data: 'map.geojson'
    });

    mapT.addLayer({
        'id': 'kilpailumaasto',
        'type': 'fill',
        'source': 'kilpailumaasto',
        'layout': {},
        'paint': {
            'fill-color': '#fff',
            'fill-opacity': 0.2
        }
    });

    mapT.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'kilpailumaasto',
        'layout': {},
        'paint': {
            'line-color': '#006400',
            'line-width': 2
        }
    });
    mapT.on('click', 'kilpailumaasto', () => {
        new mapboxgl.Popup({
                offset: 80
            })
            .setLngLat([27.879, 60.751])
            .setHTML('Kilpailualue')
            .addTo(mapT);
    });
    mapT.on('mouseenter', 'kilpailumaasto', () => {
        mapT.getCanvas().style.cursor = 'pointer';
    });

    mapT.on('mouseleave', 'kilpailumaasto', () => {
        mapT.getCanvas().style.cursor = '';
    });

});
// 3D-näkymä:
function showInit() {
    $("#mapThreeD").show();
    $("#mapTerrain").hide();
}
//"maastokartta"-näkymä:
function changeOutdoors() {
    $("#mapThreeD").hide();
    $("#mapTerrain").show();
}