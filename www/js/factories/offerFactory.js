angular.module('offerFactory', [])

.factory('offerFactory', function ($localStorage, ConnectivityMonitor, factory, $ionicPopup) {
    var comun = {};
    var productDetail = {};

    comun.setProductDetail = function (product) {
        productDetail = product;
    }

    comun.getProductDetail = function () {
            return productDetail;
        }
        /*
            Función para agregar un nuevo producto a la lista de favoritos
            verificando si existe el array de favoritos, de lo contrario lo crea
        */
    comun.addFavorite = function (product) {
            //$localStorage.favorites = [];
            if (!$localStorage.hasOwnProperty('favorites'))
                $localStorage.favorites = [];

            var cat = $localStorage.favorites.filter(function (obj) {
                return obj.id == product.id;
            });
            if (cat.length == 0) {
                factory.ionicMessage('Atención', 'Su producto se ha añadido a su lista de favoritos');
                product.ProductStore.likes = product.ProductStore.likes + 1;
                product.supermarketId = factory.supermarketId;
                $localStorage.favorites.push(product);
                //si se agrega un nuevo producto entonces se debe incrementar la cantidad de likes
                //de dicho producto en la oferta específica
                factory.addOrRemoveLikes(product.ProductStore.offerId, product.ProductStore.productId, 1);
            } else {
                factory.ionicMessage('Atención', 'Este producto ya está en sus favoritos.');
            }
        }
        /*
            Función para eliminar cierto producto de la lista de favoritos del usuario local
            además se decrementa la cantidad de likes en el servidor para dicho producto
        */
    comun.removeFavorite = function (product) {

            $ionicPopup.confirm({
                title: 'Eliminar favorito',
                template: '¿Realmente desea quitar el producto de su lista?'
            }).then(function (res) {
                if (res) {
                    //busco el index del producto en mi lista local de favoritos para eliminarlo
                    var index = $localStorage.favorites.indexOf(product);

                    if (index > -1) { //indica que se econtró el producto en el listado
                        factory.addOrRemoveLikes(product.ProductStore.offerId, product.ProductStore.productId, 2)
                            .then(function (res) {
                                $localStorage.favorites.splice(index, 1);
                            });
                        return index
                    } else
                        console.log('el índice no caza');

                } else {
                    return -1
                }
            })
        }
        /*
            Función para obtener un arreglo con todos los favoritos
        */
    comun.getFavorites = function (callback) {
        var index = 0;
        var product = {};
        if (ConnectivityMonitor.ifOffline())
            return callback($localStorage.favorites);

        factory.getProductInOfferAPI(buildFavArray())
            .then(function (res) {
                for (var i = 0; i < res.length; i++) {
                    product = $localStorage.favorites.filter(function (obj) {
                        return obj.id == res[i][0].id && obj.supermarketId == res[i][0].supermarketId;
                    })[0];
                    index = $localStorage.favorites.indexOf(product);
                    product.ProductStore = res[i][0].ProductStore;
                    product.description = res[i][0].description;
                    product.updatedAt = res[i][0].updatedAt;
                    product.createdAt = res[i][0].createdAt;

                    $localStorage.favorites[index] = product;
                }
                callback($localStorage.favorites);
            })
    }

    function buildFavArray() {
        var size = $localStorage.favorites.length;
        var actualFav = $localStorage.favorites;
        var favArray = [];
        for (var i = 0; i < size; i++) {
            favArray.push({
                supermarketId: actualFav[i].supermarketId,
                productId: actualFav[i].id,
                offerId: actualFav[i].ProductStore.offerId
            });
        }
        return favArray;
    }

    return comun;
})
