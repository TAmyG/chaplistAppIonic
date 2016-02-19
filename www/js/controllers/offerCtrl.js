var g;
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
    
        $scope.get = function () {
            $ionicPopup.alert({
                title: 'resultado',
                template: factory.token()
            });

            factory.getStoresAPI(3)
                .then(function (res) {
                    $ionicPopup.alert({
                        title: 'resultado',
                        template: 'factory.token()'
                    });

                });
            /*FacebookFactory.getFacebookFriends(function(res){
                $ionicPopup.alert({
                    title: 'resultado',
                    template: JSON.stringify(res)
                });
            });*/
        }
    })
    .controller('ProductCtrl', function ($scope, $rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicFilterBar,factory) {

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
        factory.getProductsInOfferAPI(1);
        $rootScope.products = [{
            "name": 'pollo rey',
            "description": 'el mejor sabor',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            "category": 'carnes'
        }, {
            "name": 'pollo king',
            "description": 'el mejor pollo',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            "category": 'carnes'
        }, {
            "name": 'pollo rey',
            "description": 'el mejor sabor',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            "category": 'carnes'
        }, {
            "name": 'pollo king',
            "description": 'el mejor pollo',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25624.png',
            "category": 'carnes'
        }, {
            "name": 'Sabritas',
            "description": 'las mejores papas',
            "image": 'img/snack1.png',
            "category": 'golosinas'
        }, {
            "name": 'Ganado jove',
            "description": 'la mejor carne',
            "image": 'http://www.supermercadoslatorre.com/wp-content/uploads/2014/09/slidercarnes1-620x300.png',
            "category": 'carnes'
        }, {
            "name": 'Sabritas',
            "description": 'las mejores papas',
            "image": 'http://directorio.guatemala.com/custom/domain_1/image_files/sitemgr_photo_25562.png',
            "category": 'golosinas'
        }, {
            "name": 'Ganado jove',
            "description": 'la mejor carne',
            "image": 'http://www.supermercadoslatorre.com/wp-content/uploads/2014/09/slidercarnes1-620x300.png',
            "category": 'carnes'
        }];
    })

.controller('DetalleCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {

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
    })
    .controller('FavCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {

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
