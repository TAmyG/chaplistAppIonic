angular.module('actionFactory', [])
    //*************************************************************************************************************************
    .factory('factory', function ($http, $ionicPopup, $cordovaDevice, $localStorage) {
        var comun = {};
        var packagaName = 'com.ionicframework.betasocial427641';
        var secretKey = 'ff19a665b11d832814bd6c94a89f5e921eb956ee0e9e63658571fada5759a4d9';
        /*
            Función para verificar el token al primer inicio de la aplicación
        */
        comun.tokenVerified = function () {
            var body = {};
            var tokenAux = {};
            getSupermarketsAPI();//obtiene todos los supermercados actuales
            if (comun.existsTokenAPI())
                return;
            //de no existir un token se procede a solicitar uno a la API
            body.packageName = packagaName;
            body.secretKey = secretKey;
            body.uuid = 'abcdefghijokl1234567' //$cordovaDevice.getUUID();

            //return $http.post('https://api-chaplist-kuan.c9users.io/api/Chap/tokenPetition', body)
            return $http.post('http://192.168.0.14:8080/api/Chap/tokenPetition', body)
                .then(function (res) {
                    tokenAux = res.data.replace('"', '').replace('"', '');
                    if (res.status = 200 && tokenAux != 'null') {
                        $localStorage.tokenAPI = tokenAux;                        
                        return tokenAux;
                    } else {
                        alert('Las credenciales de la app no existen en la API');
                        return res;
                    }
                }, function (err) {
                    return err;
                });
        }
        /*
            Función para obtener todas las tiendas de un supermercado específico
        */
        comun.getStoresAPI =  function(supermarketId){
            var storesAux = [];
            if(comun.existsTokenAPI())
                //return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Stores/' + supermarketId + '/' + getTokenAPI())
                return $http.get('http://192.168.0.14:8080/api/Chap/Stores/' + supermarketId + '/' + getTokenAPI())
                .then(function (res) {
                    if (res.status = 200) {
                        storesAux = transformToJson(res.data);
                        return storesAux;
                    } else {
                        alert('Las credenciales de la app no existen en la API');
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
        comun.getProductsInOfferAPI = function(supermarketId){
            if(comun.existsTokenAPI())
                //return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Stores/' + supermarketId + '/' + getTokenAPI())
                return $http.get('http://192.168.0.14:8080/api/Chap/Offer/' + supermarketId + '/' + getTokenAPI())
                .then(function (res) {
                    if (res.status = 200) {
                        products = transformToJson(res.data);
                        console.log(products)
                        return products;
                    } else {
                        alert('Las credenciales de la app no existen en la API');
                        return res;
                    }
                }, function (err) {
                    return err;
                });
            else
                alert('Las credenciales de la app no existen en la API');
        }
        /*
            Función que obtiene los supermercados desde la API
        */
        comun.getSupermarkets = function () {
            return $localStorage.supermarkets;
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
        function getSupermarketsAPI() {
            var result = {};
            if(!comun.existsTokenAPI()){
                alert('Esta app no tiene un token válido para el uso de la API');
                return;
            }
            //return $http.get('https://api-chaplist-kuan.c9users.io/api/Chap/Supermarkets/' + getTokenAPI())
            return $http.get('http://192.168.0.14:8080/api/Chap/Supermarkets/' + getTokenAPI())
                .then(function (res) {
                    if (res.status = 200) {
                        result = transformToJson(res.data);
                        compareToken(result.token);
                        $localStorage.supermarkets = result.supermarkets;
                        return result.supermarkets;
                    } else
                        return res.data.error;
                }, function (err) {
                    alert(getTokenAPI());
                    return err;
                });
        }
        /*
            Función para obtener el token actual en caso de existir sino, retorna null
        */
        function getTokenAPI() {
            return $localStorage.tokenAPI;
        }
        comun.token = function(){
            return $localStorage.tokenAPI;
        }
        /*
            Función para comparar el token actual y reemplazarlo en caso de que halla vencido
        */
        function compareToken(newToken) {
            if (getTokenAPI() != newToken) {
                console.log('Es distinto', comun.token, newToken);
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
