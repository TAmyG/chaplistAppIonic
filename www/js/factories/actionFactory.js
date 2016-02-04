angular.module('actionFactory', [])
//*************************************************************************************************************************
.factory('factory', function($http, $ionicPopup, $cordovaDevice, $localStorage){
    var comun  = {};
    comun.token = null;
    comun.supermarkets = [];
    var packagaName = 'com.ionicframework.betasocial427641';
    var secretKey = '9be5be62ebcd7c1139ea14cc0a0f8e9d6df96053b95a2677dc4a4e4bad4392d5';
    //var secretKey = '8e9d6df96053b95a2677dc4a4e4bad4392d5';

    /*
        Función para verificar el token al primer inicio de la aplicación
    */
    comun.tokenVerified = function () {
        var body = {};
        if(comun.getToken())
            return;
        //de no existir un token se procede a solicitar uno a la API
        body.packageName = packagaName;
        body.secretKey = secretKey;
        body.uuid = 'abcdefghijokl1234567'//$cordovaDevice.getUUID();

        return $http.post('http://192.168.0.14:8080/api/Chap/tokenPetition', body)
            .then(function (res) {
                if(res.status = 200){
                    comun.token = res.data.replace('"','').replace('"','');
                    console.log(comun.token);
                    $localStorage.tokenApp = comunt.token;
                    //localStorageService.set('tokenApp', comun.token);
                    return comun.token;
                }else{
                    return res.data.error;
                }
            }, function (err) {
                return err;
            });
    }


    comun.getSupermarkets = function(){
        var result = {};
        return $http.get('http://192.168.0.14:8080/api/Chap/Supermarkets/'+comun.getToken())
            .then(function (res) {
                if(res.status =200){
                    result = transformToJson(res.data);
                    compareToken(result.token);
                    comun.supermarkets = result.supermarkets;
                    return comun.supermarkets
                }else
                    return res.data.error;
            }, function (err) {
                return err;
            });
    }

    /*
        Función para obtener el token actual en caso de existir sino, retorna null
    */
    comun.getToken = function(){
        if(!comun.token){
            //comun.token = localStorageService.get('tokenApp');
            comun.token =  $localStorage.tokenApp;
            return comun.token;
        }else
            return comun.token;
    }

    //*************************************************************************************************
    /*
        Función para comparar el token actual y reemplazarlo en caso de que halla vencido
    */
    function compareToken(newToken){
        if(comun.token != newToken){
            console.log('Es distinto', comun.token, newToken);
            setToken(newToken);
        }

    }

    /*
        Función para setear un token
    */
    function setToken(newToken){
        comun.token = newToken;
        $localStorage.tokenApp = newToken;
        //localStorageService.set('tokenApp', newToken);
    }

    function transformToJson(data){
        return JSON.parse(data);
    }

    return comun;

})

