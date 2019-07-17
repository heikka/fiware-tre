import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
    Feature, FeatureCollection, GeometryCollection, LineString,
    MultiLineString, MultiPoint, MultiPolygon, Point, Polygon, GeoJsonGeometryTypes,
    GeoJsonTypes, GeometryObject, Geometry
} from "geojson";
import { identifier, updateExpression } from '@babel/types';


import { MapState } from '../../../store/map/maptypes';
import { selectMapId, unselectMapId } from '../../../store/map/mapactions';
import { AppState } from '../../../store';


var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

interface LatLng {
    lat: number,
    lng: number,
    radius?: number,
    lampOffCnt?: number,
    lampOnCnt?: number,
    alarm?: boolean,
    markerCnt?: number
}

interface MapProps {
    //readonly selectMapId?: typeof selectMapId,
    selectMapId: (id: string) => void;
//    readonly unselectMapId?: typeof unselectMapId,
//    readonly map?: MapState,
    readonly zoom: number
}


let mapContainer: any;

const images = [
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/light_medium_off_commissionedok_con_error_unsel.png', id: 'lightOffError' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/light_medium_off_commissionedok_con_normal_unsel.png', id: 'lightOff' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/light_medium_on_commissionedok_con_error_unsel.png', id: 'lightOnError' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/light_medium_on_commissionedok_con_normal_unsel.png', id: 'lightOn' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/WA 1.png', id: 'wastebin' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/site_medium_off_auto_con_normal_sel.png', id: 'cabinet_auto_off' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/light_medium_on_notcommissioned_disc_normal_sel.png', id: 'ambientlightsensor' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/WA 3.png', id: 'wastebin_low' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/WA 2.png', id: 'wastebin_half' },
    { url: 'http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/WA 3.png', id: 'wastebin_full' },
];


export const TampereMap: React.SFC<MapProps> = ({zoom, selectMapId}: MapProps) => {

    const [markers, setMarkers] = useState([]);
    const [featureCollection, setFeatureCollection] = useState({        
    });

    selectMapId('');

    useEffect(() => {

        if (!markers.length) {
            {
                //let url = 'https://context.pre.fiware.cityvision.cloud/v2/entities?type=Streetlight&limit=400&offset=0';
                //let url = 'https://context.tampere.fiware.cityvision.cloud/v2/entities?q=dateModified%3E2019-06-05T12:48:00Z';
                let url = 'https://context.tampere.fiware.cityvision.cloud/v2/entities?limit=800&offset=0';
                url += "&type=Streetlight%2CStreetlightControlCabinet%2CAmbientLightSensor%2CWasteContainer";
                axios.get(url,
                    { 'headers': { "FIWARE-Service": "tampere" } })
                    .then(res => {
                        const markersList = res.data;
                        //console.log(markersList);

                        const featureColl: FeatureCollection = {
                            type: 'FeatureCollection',
                            features: []
                        };

                        for (let i: number = 0; i < markersList.length; i++) {

                            let marker = markersList[i];
                            //console.log('marker:', marker);
                            let location = marker["location"];
                            if (location) {
                                //if (location && marker.type === 'WasteContainer') {
                                //  console.log('marker', marker);
                                let value = location["value"];
                                let coordinates = value["coordinates"];
                                if (coordinates) {

                                    let lng = coordinates[0];
                                    let lat = coordinates[1];

                                    let daliCommError = marker["daliCommError"];
                                    let daliDimmingError = marker["daliDimmingError"];
                                    let daliGearError = marker["daliGearError"];
                                    let daliLampError = marker["daliLampError"];

                                    let failure = 0;

                                    if (!failure && daliCommError && daliCommError.value === "on") {
                                        failure = 1;
                                    }

                                    if (!failure && daliDimmingError && daliDimmingError.value === "on") {
                                        failure = 1;
                                    }

                                    if (!failure && daliGearError && daliGearError.value === "on") {
                                        failure = 1;
                                    }

                                    if (!failure && daliLampError && daliLampError.value === "on") {
                                        failure = 1;
                                    }


                                    let illuminanceLevel = marker["illuminanceLevel"];
                                    let intensity = marker["intensity"];
                                    /*
                                    if (illuminanceLevel)
                                        console.log("illuminanceLevel", illuminanceLevel.value);
                                    if (intensity)                                        
                                        console.log("intensity", intensity.value);
                                    */

                                    let lightOn = 0;
                                    if (illuminanceLevel && illuminanceLevel.value > 0)
                                        lightOn = 1.0;

                                    let mag = 1;
                                    if (!lightOn && failure)
                                        mag = 2;
                                    if (!lightOn && !failure)
                                        mag = 3;
                                    if (lightOn && !failure)
                                        mag = 4;

                                    // console.log(marker.type);
                                    // Streetlight
                                    // WasteContainer
                                    // AmbientLightSensor
                                    // StreetlightControlCabinet
                                    if (marker.type === 'WasteContainer') {
                                        mag = 5;
                                        let fillingLevel = 0;
                                        if (marker.fillingLevel && marker.fillingLevel.value)
                                            fillingLevel = marker.fillingLevel.value;
                                        /*
                                                                                    > 0-49%: green
                                                                                    > 
                                                                                    > 50-85%: yellow
                                                                                    > 
                                                                                    > 86-100% red
                                                                                    > 
                                        */
                                        if (fillingLevel > 0)
                                            mag = 8;

                                        if (fillingLevel >= 0.50)
                                            mag = 9;

                                        if (fillingLevel >= 0.86)
                                            mag = 10;

                                    }


                                    if (marker.type === 'StreetlightControlCabinet')
                                        mag = 6;

                                    if (marker.type === 'AmbientLightSensor')
                                        mag = 7;

                                    let streetAddress = "";
                                    let address = marker["address"];
                                    if (address && address.value && address.value && address.value.streetAddress)
                                        streetAddress = address.value.streetAddress;


                                    const feature: Feature = {
                                        id: 100 + i,
                                        type: "Feature",
                                        geometry: {
                                            type: "Point",
                                            coordinates: [lng, lat]
                                        },
                                        properties: {
                                            color: "#ff0000",
                                            mag: mag,
                                            lightOn: lightOn,
                                            failure: failure,
                                            streetAddress: streetAddress,
                                            itemId: marker.id,
                                            itemType: marker.type
                                        }
                                    };

                                    featureColl.features.push(feature);
                                }
                            }
                        }

                        setMarkers(markersList);
                        setFeatureCollection(featureColl);
                    })
                    .catch(e => {
                        console.log('Error:', e);
                        alert('Cannot fetch data! ' + e)
                    })
            }
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpa2thIiwiYSI6ImNqd2JybzB0dzA1YXgzem53cWFwd2FnYWYifQ.dfbsP80dQFAG1iOyrQp6mg';
        var map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/heikka/cjwbsr3380hes1clajwsc7m6y',
            center: [23.7869773, 61.4850743],
            zoom: 14
        });

        const nav = new mapboxgl.NavigationControl();
        map.addControl(nav, 'top-right');

        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true
        });

        var popupMenu = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false
        });

        map.on('mouseenter', 'streetlight', function (e: any) {
            //map.on('mouseenter', 'streetlight', function (e: any) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.

            let p: any = e.features[0].properties;

            let html: string = "";
            html += p.itemType;
            html += " ";
            html += p.itemId;
            html += "<br>";
            html += p.streetAddress;
            html += "";

            popup.setLngLat(e.features[0].geometry.coordinates)
                //.setHTML(e.features[0].properties.address.value.streetAddress)
                .setHTML(html)
                .addTo(map);
        });

        map.on('mouseleave', 'streetlight', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });


        map.on('click', 'streetlight', function (e: any) {

console.log('click', );

            //map.on('mouseenter', 'streetlight', function (e: any) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.

            let p: any = e.features[0].properties;

            let html: string = "<div class='popup-menu'>";
            html += p.itemType;
            html += " ";
            html += p.itemId;
            html += "<br>";
            html += p.streetAddress;

            selectMapId(p.itemId);

            html += "<hr><a href='#'>Switch ON</a>";
            html += "<br><a href='#'>Set work in progress</a>";
            html += "<br><a href='#'>Change dimming group</a>";
            html += "<br><a href='#'>Create issue</a>";
            html += "<br><a href='#'>Show details</a>";
            html += "</div>";

            popupMenu.setLngLat(e.features[0].geometry.coordinates)
                //.setHTML(e.features[0].properties.address.value.streetAddress)
                .setHTML(html)
                .addTo(map);
        });
        /*
                map.on('click', 'streetlight', function (e: any) {
        
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    //var description = e.features[0].properties.description;
        
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
        
                    console.log(coordinates);
        
                    coordinates[0] += 0.01;
                    //coordinates[1] = e.lngLat.lat;
        
                    let p: any = e.features[0].properties;
        
                    let html: string = "";
                    html += p.itemType;
                    html += " ";
                    html += p.itemId;
                    html += "<br>";
                    html += p.streetAddress;
        
                    // e.features[0].geometry.coordinates
                    popupMenu.setLngLat(coordinates)
                        //.setHTML(e.features[0].properties.address.value.streetAddress)
                        .setHTML(html)
                        .addTo(map);
                });
        */

        // filters for classifying streetlights into five categories based on magnitude
        var mag1 = ["<", ["get", "mag"], 2];
        var mag2 = ["all", [">=", ["get", "mag"], 2], ["<", ["get", "mag"], 3]];
        var mag3 = ["all", [">=", ["get", "mag"], 3], ["<", ["get", "mag"], 4]];
        var mag4 = ["all", [">=", ["get", "mag"], 4], ["<", ["get", "mag"], 5]];
        var mag5 = ["all", [">=", ["get", "mag"], 5], ["<", ["get", "mag"], 6]];
        var mag6 = ["all", [">=", ["get", "mag"], 6], ["<", ["get", "mag"], 7]];
        var mag7 = ["all", [">=", ["get", "mag"], 7], ["<", ["get", "mag"], 8]];
        var mag8 = ["all", [">=", ["get", "mag"], 8], ["<", ["get", "mag"], 9]];
        var mag9 = ["all", [">=", ["get", "mag"], 9], ["<", ["get", "mag"], 10]];
        var mag10 = [">=", ["get", "mag"], 10];

        var lightOn = ["get", "lightOn"];
        var failure = ["get", "failure"];

        // colors to use for the categories
        var colors = ['#F3F3F4', '#FFCC00', '#A20000', '#fc4e2a', '#e31a1c'];

        map.on('load', function () {
            // add a clustered GeoJSON source for a sample set of streetlights
            map.addSource('streetlights', {
                "type": "geojson",
                "data": featureCollection,
                "cluster": true,
                "clusterMaxZoom": 14,
                "clusterRadius": 55,
                "clusterProperties": {
                    "mag1": ["+", ["case", mag1, 1, 0]],
                    "mag2": ["+", ["case", mag2, 1, 0]],
                    "mag3": ["+", ["case", mag3, 1, 0]],
                    "mag4": ["+", ["case", mag4, 1, 0]],
                    "mag5": ["+", ["case", mag5, 1, 0]],
                    "mag6": ["+", ["case", mag6, 1, 0]],
                    "mag7": ["+", ["case", mag7, 1, 0]],
                    "mag8": ["+", ["case", mag8, 1, 0]],
                    "mag9": ["+", ["case", mag9, 1, 0]],
                    "mag10": ["+", ["case", mag10, 1, 0]],
                    "lightOn": ["+", lightOn],
                    "failure": ["+", failure],
                }
            });

            Promise.all(
                images.map(img => new Promise((resolve, reject) => {
                    map.loadImage(img.url, (error: any, res: any) => {
                        if (error)
                            throw error;

                        map.addImage(img.id, res)
                        resolve();
                    })
                }))
            )
                .then(() => {

                    /*
                                        map.addLayer({
                                            id: "clusters",
                                            type: "circle",
                                            source: "streetlights",
                                            filter: ["has", "point_count"],
                                            paint: {
                                                "circle-radius": {
                                                    property: "point_count",
                                                    type: "interval",
                                                    stops: [
                                                        [0, 20],
                                                        [100, 30],
                                                        [750, 40]
                                                    ]
                                                }
                                            }
                                        });
                    */
                    map.addLayer({
                        id: "streetlight",
                        type: "symbol",
                        source: "streetlights",
                        filter: ["!", ["has", "point_count"]],
                        layout: {
                            //"icon-image": "normal",
                            "icon-image": ["case",
                                mag1, "lightOnError",
                                mag2, "lightOffError",
                                mag3, "lightOff",
                                mag4, "lightOn",
                                mag5, "wastebin",
                                mag6, "cabinet_auto_off",
                                mag7, "ambientlightsensor",
                                mag8, "wastebin_low",
                                mag9, "wastebin_half",
                                mag10, "wastebin_full",
                                "lightOn"],
                            "text-allow-overlap": true,
                            "icon-allow-overlap": true,
                            "icon-size": 1.00
                        }
                    });
                });

            // circle and symbol layers for rendering individual streetlights (unclustered points)
            /*
            map.addLayer({
                "id": "earthquake_circle",
                "type": "circle",
                "source": "streetlights",
                "filter": ["!=", "cluster", true],
                "paint": {
                    "circle-color": ["case",
                        mag1, colors[0],
                        mag2, colors[1],
                        mag3, colors[2],
                        mag4, colors[3], colors[4]],
                    "circle-opacity": 0.6,
                    "circle-radius": 12
                }
            });
            */
            map.addLayer({
                "id": "streetlights_label",
                "type": "symbol",
                "source": "streetlights",
                "filter": ["!=", "cluster", true],
                "layout": {
                    "text-field": "{point_count_abbreviated}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-size": 10
                },
                "paint": {
                    "text-color": ["case", ["<", ["get", "mag"], 3], "black", "white"]
                }
            });

            // objects for caching and keeping track of HTML marker objects (for performance)
            var markers: any = {};
            var markersOnScreen: any = {};
            let doUpdateMarkers = false;

            let timer = setInterval(checkUpdateMarkers, 1000);

            function checkUpdateMarkers() {
                if (doUpdateMarkers) {
                    updateMarkers();
                    doUpdateMarkers = false;
                }
            }

            const updateMarkers = () => {

                //console.log(new Date(), 'updateMarkers');
                var newMarkers: any = {};
                var features = map.querySourceFeatures('streetlights');

                //console.log('features', features);

                // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
                // and add it to the map if it's not there already
                for (var i = 0; i < features.length; i++) {
                    var coords = features[i].geometry.coordinates;
                    var props = features[i].properties;
                    if (!props.cluster) continue;
                    var id = props.cluster_id;

                    var marker = markers[id];
                    if (!marker) {
                        var el = createDonutChart(props);
                        marker = markers[id] = new mapboxgl.Marker({ element: el }).setLngLat(coords);
                    }
                    newMarkers[id] = marker;

                    if (!markersOnScreen[id])
                        marker.addTo(map);
                }
                // for every marker we've added previously, remove those that are no longer visible
                for (id in markersOnScreen) {
                    if (!newMarkers[id])
                        markersOnScreen[id].remove();
                }
                markersOnScreen = newMarkers;
            }

            function onMove(e: any) {
                //console.log('onMove');
                doUpdateMarkers = true;
                //updateMarkers();
            }

            function onMoveend(e: any) {
                //console.log('onMoveend');
                doUpdateMarkers = true;
                //updateMarkers();
            }

            function onZoom(e: any) {
                //console.log('onZoom', e);
                //updateMarkers();
            }

            // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
            map.on('data', function (e: any) {
                if (e.sourceId !== 'streetlights' || !e.isSourceLoaded) return;

                //console.log('on data', map);

                map.on('move', onMove);
                map.on('moveend', onMoveend);
                map.on('zoom', onZoom);
                updateMarkers();
            });
            /*
                        map.on('mousemove', function (e: any) {
            
                            var features = map.queryRenderedFeatures(e.point, {
                                layers: ['clusters']
                            })
            
                            if (features.length)
                                //console.log('features', features);
            
                                var cluster_id = features[0].properties.cluster_id;
                                if (cluster_id) {
                                    console.log('cluster_id', cluster_id);
                                    //var all_features = cluster.getLeaves(cluster_id, Math.floor(map.getZoom()), limit = Infinity);
                                    //console.log(all_features);
                                }
                        });
            */

        });

        // code for creating an SVG donut chart from feature properties
        function createDonutChart(props: any) {
            //console.log(props);
            var offsets = [];
            //console.log('props', props);
            var counts = [props.mag1, props.mag2, props.mag3, props.mag4, props.mag5, props.mag6, props.mag7, props.mag8, props.mag9, props.mag10];
            var total = 0;
            for (var i = 0; i < counts.length; i++) {
                offsets.push(total);
                total += counts[i];
            }
            var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
            var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
            var r0 = Math.round(r * 0.6);
            var w = r * 2;
            //onmouseover="alert(1)" 
            var html = '<svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w +
                '" text-anchor="middle" style="font: ' + fontSize + 'px sans-serif">';
            /*
            for (i = 0; i < counts.length; i++) {
                html += donutSegment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i]);
            }
            */


            // FAILURES
            //            let failColorLeft = '#F3F3F4';
            //            let failColorRight = '#F3F3F4';
            let failColorLeft = '#cacace';
            let failColorRight = '#cacace';

            /*            if (props.failure === props.point_count) {
                            failColorRight = '#A20000';
                            failColorLeft = '#A20000';
                        }
                        else {
                            if (props.failure > 0) {
                                failColorLeft = '#A20000';
                            }
                        }
            */
            if (props.failure > 0) {
                failColorLeft = '#A20000';
            }
            html += donutSegment(0.25, 0.5, r, r0, failColorRight);
            html += donutSegment(0.5, 0.75, r, r0, failColorLeft);

            // LIGHT ON
            let lightColorLeft = '#cacace';
            let lightColorRight = '#cacace';
            if (props.lightOn === props.point_count) {
                lightColorRight = '#FFCC00';
                lightColorLeft = '#FFCC00';
            }
            else {
                if (props.lightOn > 0) {
                    lightColorLeft = '#FFCC00';
                }
            }

            html += donutSegment(0.75, 1.0, r, r0, lightColorLeft);
            html += donutSegment(0, 0.25, r, r0, lightColorRight);

            html += '<circle cx="' + r + '" cy="' + r + '" r="' + r0 +
                '" fill="#225A9A" /><text dominant-baseline="central" fill="#ffffff" transform="translate(' +
                r + ', ' + r + ')">' + total.toLocaleString() + '</text></svg>';

            //html = '<img src="http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/blank_4.png" width="'+(2*r)+'" height="auto" />';
            //html = '<div style="background-image: url(http://com.capelon.city-vision.s3-website.eu-north-1.amazonaws.com/images/blank_4.png); background-repeat: no-repeat; width='+r+'px height='+r+'px></div>';
            var el = document.createElement('div');
            el.innerHTML = html;
            return el.firstChild;
        }

        function donutSegment(start: number, end: number, r: number, r0: number, color: string) {
            if (end - start === 1) end -= 0.00001;
            var a0 = 2 * Math.PI * (start - 0.25);
            var a1 = 2 * Math.PI * (end - 0.25);
            var x0 = Math.cos(a0), y0 = Math.sin(a0);
            var x1 = Math.cos(a1), y1 = Math.sin(a1);
            var largeArc = end - start > 0.5 ? 1 : 0;

            return ['<path d="M', r + r0 * x0, r + r0 * y0, 'L', r + r * x0, r + r * y0,
                'A', r, r, 0, largeArc, 1, r + r * x1, r + r * y1,
                'L', r + r0 * x1, r + r0 * y1, 'A',
                r0, r0, 0, largeArc, 0, r + r0 * x0, r + r0 * y0,
                '" fill="' + color + '" stroke="#343332" stroke-width="0.2" stroke-opacity="1" />'].join(' ');
        }

    });


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div ref={el => mapContainer = el} className="absolute top right left bottom" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
