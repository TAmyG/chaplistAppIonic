angular.module('mapsFactory', [])

.factory('GoogleMaps', function ($cordovaGeolocation, $q, $ionicLoading, $cordovaNetwork, ConnectivityMonitor) {
    var comun = {};
    var points = [{
            id: 1,
            name: 'latorre',
            latitude: 14.50453,
            longitude: -90.56674,
            image: 'http://res.cloudinary.com/dtzhkqqms/image/upload/v1454540994/torre_md6heb.png',
            address: 'San miguel petapa, zona 10',
            phoneNumber: '23095'
       },
        {
            id: 2,
            name: 'maxi',
            latitude: 14.50890,
            longitude: -90.57048,
            image: 'http://res.cloudinary.com/dtzhkqqms/image/upload/v1454542018/maxi_styw3c.png',
            address: 'San miguel petapa, semáforo',
            phoneNumber: '23012'
       }];
    /*
        Función que inicia el proceso de construcción del mapa
    */
    comun.init = function () {
            if (ConnectivityMonitor.isOnline()) {
                initMap();
                return true;
            } else {
                return false;
            }
        }
    /*

    */
    function initMap() {
        $ionicLoading.show({
            template: 'Cargando Google Maps...'
        });
        getInitPosition(function(res){
            printMap(res);
            $ionicLoading.hide();
        });
    }
    /*
        Función que retorna la posición inicial de la siguiente forma:
        Si está habilitado el gps lo hace con la posición del usuario.
        Si no lo hace respecto a la primer tienda que encuentre en el listado de tiendas.
    */
    function getInitPosition(callback) {
        var coords = {};
        //opciones utilizadas para la API de google y definición en el tiempo de carga 10 seg. max.
        var options = {
            frequency: 1000,
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
            coords.latitude = position.coords.latitude;
            coords.longitude = position.coords.longitude;
            coords.name = 'Yo';
            coords.image = 'http://res.cloudinary.com/dtzhkqqms/image/upload/v1454544462/user_v4wbos.png'
            points.push(coords);
            callback(coords);
        }, function (error) {
            callback(points[0]);
        });
    }
    /*
        Función que instancia un nuevo mapa sobre el área
        y define el centro y el zoom del mismo al inicio
    */
    function printMap(coordsObject) {
        var latLng = new google.maps.LatLng(coordsObject.latitude, coordsObject.longitude);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //Wait until the map is loaded
        google.maps.event.addListenerOnce(map, 'idle', function () {
            //Load the markers
            loadMarkers();
        });
    }
    /*
        Función para cargar todos los puntos en el mapa
    */
    function loadMarkers() {
        var record = {};
        var markerPos, marker, infoWindowContent;
        var image = {
            size: new google.maps.Size(40, 35),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
          };
        for (var i = 0; i < points.length; i++) {
            record = points[i];
            markerPos = new google.maps.LatLng(record.latitude, record.longitude);
            image.url = record.image;
            // Add the markerto the map
            marker = new google.maps.Marker({
                map: map,
                title: record.name,
                animation: google.maps.Animation.DROP,
                position: markerPos,
                icon: image
            });

            infoWindowContent = '<div><p><h4>' + record.name + '</h4></p></div>'
            if (record.name != 'Yo' ){
                infoWindowContent += '<div id="bodyContent"><p><b>Dirección:</b> '+record.address+'<br><b>Número de teléfono:</b> '+
                    record.phoneNumber+'</p>';
            }
            addInfoWindow(marker, infoWindowContent, record);
        }
    }
    /*
        Función para agregar información específica a cada marcador agregado al mapa
    */
    function addInfoWindow(marker, message, record) {
        var infoWindow = new google.maps.InfoWindow({
            content: message,
            maxWidth: 200
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
    }
    return comun;
})

//*************************************************************************************************************************

.factory('ConnectivityMonitor', function ($cordovaNetwork) {
    var comun = {};

    /*
        Función que retorna true si existe conexión a internet
    */
    comun.isOnline = function () {
            if (ionic.Platform.isWebView()) {
                return $cordovaNetwork.isOnline();
            } else {
                return navigator.onLine;
            }

        }
        /*
            Función que retorna true si no existe conexión a internet
        */
    comun.ifOffline = function () {
        if (ionic.Platform.isWebView()) {
            return !$cordovaNetwork.isOnline();
        } else {
            return !navigator.onLine;
        }
    }

    return comun;
})
