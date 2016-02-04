angular.module('actionFactory', [])
    //*************************************************************************************************************************
    .factory('factory', function ($http, $ionicPopup, $cordovaDevice, $localStorage) {
        var comun = {};
        var packagaName = 'com.ionicframework.betasocial427641';
        var secretKey = 'b3445460e0b140be4e1105eb8836b16fdcf88f0daa03ac231d14635515a49bbd';
        //var secretKey = '8e9d6df96053b95a2677dc4a4e4bad4392d5';

        /*
            Función para verificar el token al primer inicio de la aplicación
        */
        comun.tokenVerified = function () {
                var body = {};
                var tokenAux = {};
               /* if (comun.existsTokenAPI())
                    return;*/
                //de no existir un token se procede a solicitar uno a la API
                body.packageName = packagaName;
                body.secretKey = secretKey;
                body.uuid = 'abcdefghijokl1234567' //$cordovaDevice.getUUID();

                return $http.post('http://localhost:8080/api/Chap/tokenPetition', body)
                    .then(function (res) {
                        tokenAux = res.data.replace('"', '').replace('"', '');
                        if (res.status = 200 && tokenAux != 'null') {
                            $localStorage.tokenAPI = tokenAux;
                            getSupermarketsAPI();//obtiene todos los supermercados actuales
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
            return $http.get('http://localhost:8080/api/Chap/Supermarkets/' + getTokenAPI())
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

        function transformToJson(data) {
            return JSON.parse(data);
        }

        return comun;

    })
