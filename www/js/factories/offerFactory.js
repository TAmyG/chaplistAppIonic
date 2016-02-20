angular.module('offerFactory', [])

.factory('offerFactory', function () {
    var comun = {};
    var productDetail = {};

    comun.setProductDetail = function(product){
        productDetail = product;
    }

    comun.getProductDetail = function(){
        return productDetail;
    }
    return comun;
})
