"use strict";

let controlUIzoomIn = document.getElementById("cd-zoom-in"),
    controlUIzoomOut = document.getElementById("cd-zoom-out");

mapa(9.933684, -84.061228);

function mapa(latitude, longitude) {
    //set your google maps parameters
    let $latitude = latitude,
        $longitude = longitude,
        $map_zoom = 16;

    //google map custom marker icon - .png fallback for IE11
    let is_internetExplorer11 =
        navigator.userAgent.toLowerCase().indexOf("trident") > -1;
    let $marker_url = is_internetExplorer11
        ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png"
        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg";

    //define the basic color of your map, plus a value for saturation and brightness
    let $main_color = "#2d313f",
        $saturation = -20,
        $brightness = 5;

    //we define here the style of the map
    let style = [
        {
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [{ saturation: $saturation }]
        },
        {
            //poi stands for point of interest - don't show these lables on the map
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show highways lables on the map
            featureType: "road.highway",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ visibility: "off" }]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        }
    ];

    //set google map options
    let map_options = {
        center: new google.maps.LatLng($latitude, $longitude),
        zoom: $map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style
    };

    //inizialize the map
    let map = new google.maps.Map(
        document.getElementById("google-container"),
        map_options
    );

    //add a custom marker to the map
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng($latitude, $longitude),
        map: map,
        visible: true,
        icon: $marker_url
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map
        while (controlDiv.firstChild) {
            controlDiv.removeChild(controlDiv.firstChild);
        }
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, "click", function () {
            map.setZoom(map.getZoom() + 1);
        });
        google.maps.event.addDomListener(controlUIzoomOut, "click", function () {
            map.setZoom(map.getZoom() - 1);
        });
    }

    let zoomControlDiv = document.createElement("div");
    let zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
}


let controlUIzoomIn2 = document.getElementById("cd-zoom-in2"),
    controlUIzoomOut2 = document.getElementById("cd-zoom-out2");

mapa2(9.933684, -84.061228);

function mapa2(latitude, longitude) {
    //set your google maps parameters
    let $latitude = latitude,
        $longitude = longitude,
        $map_zoom = 16;

    //google map custom marker icon - .png fallback for IE11
    let is_internetExplorer11 =
        navigator.userAgent.toLowerCase().indexOf("trident") > -1;
    let $marker_url = is_internetExplorer11
        ? "https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png"
        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg";

    //define the basic color of your map, plus a value for saturation and brightness
    let $main_color = "#2d313f",
        $saturation = -20,
        $brightness = 5;

    //we define here the style of the map
    let style = [
        {
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [{ saturation: $saturation }]
        },
        {
            //poi stands for point of interest - don't show these lables on the map
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show highways lables on the map
            featureType: "road.highway",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
        },
        {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ visibility: "off" }]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: $main_color },
                { visibility: "on" },
                { lightness: $brightness },
                { saturation: $saturation }
            ]
        }
    ];

    //set google map options
    let map_options = {
        center: new google.maps.LatLng($latitude, $longitude),
        zoom: $map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style
    };

    //inizialize the map
    let map = new google.maps.Map(
        document.getElementById("google-container2"),
        map_options
    );

    //add a custom marker to the map
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng($latitude, $longitude),
        map: map,
        visible: true,
        icon: $marker_url
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map
        while (controlDiv.firstChild) {
            controlDiv.removeChild(controlDiv.firstChild);
        }
        controlDiv.appendChild(controlUIzoomIn2);
        controlDiv.appendChild(controlUIzoomOut2);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn2, "click", function () {
            map.setZoom(map.getZoom() + 1);
        });
        google.maps.event.addDomListener(controlUIzoomOut2, "click", function () {
            map.setZoom(map.getZoom() - 1);
        });
    }

    let zoomControlDiv = document.createElement("div");
    let zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
}