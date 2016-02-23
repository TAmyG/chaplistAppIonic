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
            product.ProductStore.likes = product.ProductStore.likes + 1;
            $localStorage.favorites.push(product);
            //si se agrega un nuevo producto entonces se debe incrementar la cantidad de likes
            //de dicho producto en la oferta específica
            factory.addOrRemoveLikes(product.ProductStore.offerId, product.ProductStore.productId, 1);
        }
    }
    /*
        Función para eliminar cierto producto de la lista de favoritos del usuario local
        además se decrementa la cantidad de likes en el servidor para dicho producto
    */
    comun.removeFavorite = function(product){
        //busco el index del producto en mi lista local de favoritos para eliminarlo
        var index =  $localStorage.favorites.indexOf(product);

        if(index > -1){//indica que se econtró el producto en el listado
            factory.addOrRemoveLikes(product.ProductStore.offerId, product.ProductStore.productId, 2)
            .then(function(res){
                $localStorage.favorites.splice(index, 1);
            });
            return index
        }else
            console.log('el índice no caza');
    }
    /*
        Función para obtener un arreglo con todos los favoritos
    */
    comun.getFavorites = function(){
        return $localStorage.favorites;
    }

    return comun;
})
