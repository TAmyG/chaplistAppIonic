angular.module('actionFactory', [])
    //*************************************************************************************************************************
    .factory('factory', function ($http, $ionicPopup, $q, $cordovaDevice, $localStorage, ConnectivityMonitor) {

        /*
            Función para mostrar un mensaje sencillo en la pantalla
        */
        var ionicMessage;
        ionicMessage = function (title, template) {
            $ionicPopup.alert({
                title: title,
                template: template
            });
        }

        var comun = {};
        var packagaName = 'com.ionicframework.betasocial427641';
        var secretKey = 'ff19a665b11d832814bd6c94a89f5e921eb956ee0e9e63658571fada5759a4d9';
        comun.supermarketId = 1;
        /*
            Función para verificar el token al primer inicio de la aplicación
        */
        comun.tokenVerified = function () {
                var body = {};
                var tokenAux = {};
                var existe = false;

                if (comun.existsTokenAPI()) {
                    if (!existsSupermarketsLocal())
                        comun.getSupermarketsAPI(); //obtiene todos los supermercados actuales
                    existe = true;
                    return;
                }

                //de no existir un token se procede a solicitar uno a la API
                body.packageName = packagaName;
                body.secretKey = secretKey;
                //de no existir un token se procede a solicitar uno a la API
                body.packageName = packagaName;
                body.secretKey = secretKey;

                try {
                    body.uuid = $cordovaDevice.getUUID();
                } catch (err) {
                    body.uuid = 'abcdefghijokl1234567'
                }
                return $http.post('https://api-chaplist-kuan.c9users.io/api/Chap/tokenPetition', body)
                    //return $http.post('http://192.168.0.14:8080/api/Chap/tokenPetition', body)
                    .then(function (res) {
                        tokenAux = res.data.replace('"', '').replace('"', '');
                        if (res.status = 200 && tokenAux != 'null') {
                            $localStorage.tokenAPI = tokenAux;
                            $localStorage.favorites = [];
                            if (!existe)
                                comun.getSupermarketsAPI(); //obtiene todos los supermercados actuales
                            comun.getTopFavsAPI();
                            return tokenAux;
                        } else {
                            ionicMessage('Advertencia','Las credenciales de la app no existen en la API');
                            return res;
                        }
                    }, function (err) {
                        return err;
                    });
            }
            /*
                Función para obtener todas las tiendas de un supermercado específico
            */
        comun.getStoresAPI = function (supermarketId) {
                var storesAux = [];
                var deferred = {};
                var result = {};
                if (ConnectivityMonitor.ifOffline()) { //verifico conectividad a internet
                    ionicMessage('Mensaje', 'Para mejorar la experiencia, utilize internet');
                    return;
                }

                return $http.post('https://api-chaplist-kuan.c9users.io/api/Chap/tokenPetition', body)
                    //return $http.post('http://192.168.0.14:8080/api/Chap/tokenPetition', body)
                    .then(function (res) {
                        tokenAux = res.data.replace('"', '').replace('"', '');
                        if (res.status = 200 && tokenAux != 'null') {
                            $localStorage.tokenAPI = tokenAux;
                            $localStorage.favorites = [];
                            if (!existe)
                                comun.getSupermarketsAPI(); //obtiene todos los supermercados actuales
                            return tokenAux;
                        } else {
                            ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
                            return res;
                        }
                    }, function (err) {
                        return err;
                    });
            }
            /*
                Función para obtener todas las tiendas de un supermercado específico
            */
        comun.getStoresAPI = function (supermarketId) {
                var storesAux = [];
                var deferred = {};
                var result = {};

                if (ConnectivityMonitor.ifOffline()) { //verifico conectividad a internet
                    deferred = $q.defer();
                    deferred.resolve([]);
                    return deferred.promise;
                }

                if (comun.existsTokenAPI())
                    return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Stores/' + supermarketId + '/' + getTokenAPI())
                        //return $http.get('http://192.168.0.14:8080/api/Chap/Stores/' + supermarketId + '/' + getTokenAPI())
                        .then(function (res) {
                            if (res.status = 200) {
                                result = transformToJson(res.data);
                                storesAux = result.stores;
                                compareToken(result.token);
                                return storesAux;
                            } else {
                                ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
                                return res;
                            }
                        }, function (err) {
                            return err;
                        });
                else
                    return [];
            }
            /*
                Función para obtener los productos en oferta vigentes para un supermercado seleccionado
            */
        comun.getProductsInOfferAPI = function (offset) {
                var deferred = {};
                var result = {};
                var products = [];

                if (ConnectivityMonitor.ifOffline()) { //verifico conectividad a internet
                    deferred = $q.defer();
                    deferred.resolve([]);
                    return deferred.promise;
                }

                if (comun.existsTokenAPI())
                    return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Offer/' + comun.supermarketId + '/' + offset + '/' + getTokenAPI())
                        //return $http.get('http://192.168.0.14:8080/api/Chap/Offer/' + comun.supermarketId + '/' + getTokenAPI())
                        .then(function (res) {
                            if (res.status = 200) {
                                result = transformToJson(res.data);
                                products = result.products
                                compareToken(result.token);
                                return products;
                            } else {
                                ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
                                return [];
                            }
                        }, function (err) {
                            return [];
                        });
                else
                    ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
            }
            /*
                Función para obtener un producto específico en oferta
            */
        comun.getProductInOfferAPI = function (arrayProducts) {
                var products = [];
                var body = {
                    favProducts: arrayProducts
                };
                if (comun.existsTokenAPI())
                    return $http.post('https://api-chaplist-kuan.c9users.io/api/Chap/Offer/favproducts/' + getTokenAPI(), body)
                        //return $http.get('http://192.168.0.14:8080/api/Chap/Offer/' + comun.supermarketId + '/' + getTokenAPI())
                        .then(function (res) {
                            if (res.status = 200) {
                                products = transformToJson(res.data);
                                return products;
                            } else {
                                ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
                                return [];
                            }
                        }, function (err) {
                            return [];
                        });
                else
                    ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
            }
            /*
                Función para agregar o remover likes de una aplicación
            */
        comun.addOrRemoveLikes = function (offerId, productId, type) {
                var body = {};
                var newOffer = {};
                //En este caso no es necesario realizar una promesa ya que las funciones que llaman
                //a esta funcionalidad no requieren un resultado de respuesta
                if (ConnectivityMonitor.ifOffline()) //verifico conectividad a internet
                    return;

                if (comun.existsTokenAPI()) {
                    body = {
                        offerId: offerId,
                        productId: productId,
                        type: type
                    };
                    return $http.post('https://api-chaplist-kuan.c9users.io/api/Chap/Offer/likes/' + getTokenAPI(), body)
                        //return $http.get('http://192.168.0.14:8080/api/Chap/Offer/' + comun.supermarketId + '/' + getTokenAPI())
                        .then(function (res) {
                            if (res.status = 200) {
                                newOffer = transformToJson(res.data);
                                return newOffer;
                            } else {
                                ionicMessage('Advertencia', 'Ocurrio algun problema con el servidor, comunicarse con el administrador');
                                return {};
                            }
                        }, function (err) {
                            return err;
                        });
                } else
                    ionicMessage('Advertencia', 'Las credenciales de la app no existen en la API');
            }
            /*
                Función que verifica si existe un token válido
            */
        comun.existsTokenAPI = function () {
            if ($localStorage.hasOwnProperty("tokenAPI") === true)
                return true;
            else
                return false;
        }

        //*************************************************************************************************

        /*
            Función para obtener los supermerdados del almacenamiento local
        */
        comun.getSupermarketsAPI = function () {
                var result = {};
                var deferred = {};
                if (!comun.existsTokenAPI()) {
                    ionicMessage('Advertencia', 'Esta app no tiene un token válido para el uso de la API');
                    return;
                }
                if (!ConnectivityMonitor.isOnline()) { //verifico conectividad a internet
                    deferred = $q.defer();
                    deferred.resolve($localStorage.supermarkets);
                    return deferred.promise;
                }
                return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Supermarkets/' + getTokenAPI())
                    //return $http.get('http://192.168.0.14:8080/api/Chap/Supermarkets/' + getTokenAPI())
                    .then(function (res) {
                        if (res.status = 200) {
                            result = transformToJson(res.data);
                            compareToken(result.token);
                            $localStorage.supermarkets = result.supermarkets;
                            return result.supermarkets;
                        } else
                            return res.data.error;
                    }, function (err) {
                        ionicMessage('Advertencia', 'Ocurrio algun problema con el servidor, comunicarse con el administrador');
                        return err;
                    });
            }
            /*
                Función para obtener un top 5 de los favoritos en las ofertas vigentes
            */
        comun.getTopFavsAPI = function () {
                var result = [];
                var deferred = {};
                if (!comun.existsTokenAPI()) {
                    ionicMessage('Advertencia','Esta app no tiene un token válido para el uso de la API');
                    return;
                }
                if (!ConnectivityMonitor.isOnline()) { //verifico conectividad a internet
                    return comun.getTopFavs();
                }

                return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Offer/topfavs/')
                    //return $http.get('http://192.168.0.14:8080/api/Chap/Supermarkets/' + getTokenAPI())
                    .then(function (res) {
                        if (res.status = 200) {
                            result = transformToJson(res.data);
                            $localStorage.topFavs = result;
                            return result;
                        } else
                            return res.data.error;
                    }, function (err) {
                        ionicMessage('Advertencia', 'Ocurrio algun problema con el servidor, comunicarse con el administrador');
                        return err;
                    });
            }
            /*
                Función para obtener el token actual en caso de existir sino, retorna null
            */
        function getTokenAPI() {
            return $localStorage.tokenAPI;
        }

        function existsSupermarketsLocal() {
            if ($localStorage.hasOwnProperty("supermarkets") === true)
                return true;
            else
                return false;
        }
        comun.token = function () {
            return $localStorage.tokenAPI;
        }
        comun.getSupermarkets = function () {
            return $localStorage.supermarkets
        }
        comun.getTopFavs = function () {
                if ($localStorage.hasOwnProperty("topFavs") === false)
                    $localStorage.topFavs = [];
                return $localStorage.topFavs
            }
            /*
                Función para comparar el token actual y reemplazarlo en caso de que halla vencido
            */
        comun.getSupermarkets = function () {
                return $localStorage.supermarkets
            }
            /*
                Función para comparar el token actual y reemplazarlo en caso de que halla vencido
            */
        function compareToken(newToken) {
            if (getTokenAPI() != newToken) {
                setToken(newToken);
            }
        }
        /*
            Función para setear un token
        */
        function setToken(newToken) {
            $localStorage.tokenAPI = newToken;
        }
        /*
            Función que parsea un string a su formato JSON
        */
        function transformToJson(data) {
            return JSON.parse(data);
        }

        return comun;
    })
