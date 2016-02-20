angular.module('offerCtrl', [])

.controller('OfferCtrl', function ($scope, $state, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory, factory) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab('right');

        $timeout(function () {
            ionicMaterialMotion.fadeSlideIn({
                selector: '.animate-fade-slide-in .item'
            });
        }, 200);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });

        /*----------------------------------------------------------------------------------------*/
        /*----------------------------------------------------------------------------------------*/
        /*----------------------------------------------------------------------------------------*/
        $scope.supermarkets = [];
        $scope.supermarkets = factory.getSupermarkets();

        $scope.setSupermarketId = function(supermarketId){
            factory.supermarketId = supermarketId;
        }
    })
    .controller('ProductCtrl', function ($scope, $rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicFilterBar,factory, offerFactory) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('right');

        // efects
        $scope.$on('ngLastRepeat.mylist', function (e) {
            $timeout(function () {
                //ionicMaterialMotion.fadeSlideInRight();
                ionicMaterialInk.displayEffect({
                    selector: '.drop'
                });
                ionicMaterialMotion.pushDown({
                    selector: '.push-down'
                });
                ionicMaterialMotion.fadeSlideInRight({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 0); // No timeout delay necessary.
        });
        /////////////////////////////////////////////////////////////////////////////////////
        /*{
            "name": 'pollo rey',
            "description": 'el mejor sabor',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            "category": 'carnes'
        }*/
        $rootScope.products = [{
            id: 1,
            description: 'carnes',
            image: 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            ProductStore: {
                likes: 15,
                normalPrice: 12.59,
                offerPrice: 10.52
            }
        },{
            id: 2,
            description: 'tortrix',
            image: 'http://www.bbdo.com.gt/v2/images/clientes/tortrix.png',
            ProductStore: {
                likes: 15,
                normalPrice: 12.59,
                offerPrice: 10.52
            }
        }];

        /*factory.getProductsInOfferAPI().then(function(data){
            $rootScope.products = data;
        });*/
        /*
            Función para colocar un producto para su detalle
        */
        $scope.setProductDetail = function(productDetail){
            offerFactory.setProductDetail(productDetail);
        }

    })

.controller('DetalleCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk, offerFactory) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        // Set Ink
        ionicMaterialInk.displayEffect();
        //////////////////////////////////////////////////////////////////////////////////////
        $scope.favorites = [];
        $scope.productDetail = offerFactory.getProductDetail();

        $scope.addFavorite = function(productDetail){
            offerFactory.addFavorite(productDetail);
        }
    })

    .controller('FavCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk, offerFactory) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function () {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
        ////////////////////////////////////////////////////////////
        $scope.favorites = offerFactory.getFavorites();

    })

    .controller('BuscarCtrl', function ($scope, $rootScope, $state, $ionicPopup, $timeout, $ionicFilterBar) {
    $timeout(function () {
            document.getElementById('fab-activity').classList.toggle('on');
        }, 300);
        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $rootScope.products,
                update: function (filteredItems) {
                    $rootScope.products= filteredItems;
                }
            });
        };

    })
    .directive('ngLastRepeat', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngLastRepeat' + (attr.ngLastRepeat ? '.' + attr.ngLastRepeat : ''));
                    });
                }
            }
        };
    })
