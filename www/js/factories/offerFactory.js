angular.module('offerFactory', [])

.factory('offerFactory', function ($localStorage, factory) {
    var comun = {};
    var productDetail = {};

    comun.setProductDetail = function(product){
        productDetail = product;
    }

    comun.getProductDetail = function(){
        return productDetail;
    }
    /*
        Función para agregar un nuevo producto a la lista de favoritos
        verificando si existe el array de favoritos, de lo contrario lo crea
    */
    comun.addFavorite = function(product){
        if(!$localStorage.hasOwnProperty('favorites'))
            $localStorage.favorites = [];

        var cat =  $localStorage.favorites.filter(function( obj ) {
          return obj.id == product.id;
        });
        if(cat.length == 0){
            factory.addOrRemoveLikes(product.ProductStore.offerId, product.ProductStore.productId, 1)
            .then(function(res){
                product.ProductStore.likes = res.likes
                $localStorage.favorites.push(product);
            });
        }
    }
    /*
        Función para obtener un arreglo con todos los favoritos
    */
    comun.getFavorites = function(){
        return $localStorage.favorites;
    }

    return comun;
})
