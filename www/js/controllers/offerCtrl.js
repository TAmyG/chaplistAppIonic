angular.module('offerCtrl', [])

.controller('OfferCtrl', function ($scope, $state, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory, factory, $ionicLoading) {

        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab('right');

        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        // efects
        $scope.$on('ngLastRepeat.mylist', function (e) {
            $timeout(function () {
                ionicMaterialMotion.fadeSlideIn({
                    selector: '.animate-fade-slide-in .item'
                });
                $ionicLoading.hide();
            }, 0); // No timeout delay necessary.
        });
        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });

        /*----------------------------------------------------------------------------------------*/
        /*----------------------------------------------------------------------------------------*/
        /*-------   ---------------------------------------------------------------------------------*/
        $scope.supermarkets = [];
        getSupermarketsAPI();

        $scope.reload = function () {
            $scope.supermarkets = [];
            getSupermarketsAPI();
        };

        $scope.setSupermarketId = function (supermarketId) {
            factory.supermarketId = supermarketId;
        }

        function getSupermarketsAPI() {
            factory.getSupermarketsAPI().then(function (data) {
                $scope.supermarkets = data;
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
    .controller('ProductCtrl', function ($scope, $rootScope, $timeout, $ionicLoading, $ionicPlatform,
        ionicMaterialMotion, ionicMaterialInk, $ionicFilterBar, factory, offerFactory) {
        $ionicLoading.show({
            template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
        });

        $scope.deviceReady = false;
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

        $ionicPlatform.ready(function () {
            $scope.deviceReady = true;
        });
        $rootScope.products = [];
        getProducts();


        $scope.reload = function () {
            $rootScope.products = [];
            getProducts();
        };

        function getProducts() {
            factory.getProductsInOfferAPI($rootScope.products.length).then(function (data) {
                $rootScope.products = data;
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        //monitor para scroll de páginación
        $scope.$on('loadProducts', function (_, data) {
            data.forEach(function (b) {
                $rootScope.products.push({
                    ProductStore: b.ProductStore,
                    createdAt: b.createdAt,
                    updatedAt: b.updatedAt,
                    description: b.description,
                    id: b.id,
                    upc: b.upc
                });
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        });
        /*
            Función para solicitar nueva tanda de productos
        */
        $scope.loadMore = function () {
            factory.getProductsInOfferAPI($rootScope.products.length).then(function (data) {
                $rootScope.$broadcast('loadProducts', data);
            });
        };
        /*
            Función para colocar un producto para su detalle
        */
        $scope.setProductDetail = function (productDetail) {
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

    $scope.addFavorite = function (productDetail) {
            offerFactory.addFavorite(productDetail);
        }
        //PARA COMPARTIR UN PRODUCTO LA FUNCIÓN ESTÁ ESPECIFICADA EN EL CONTROLADOR PADRE appCtrl
})

.controller('FavCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk, offerFactory, factory, $state) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.$on('ngLastRepeat.mylist', function (e) {
        $timeout(function () {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });

            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });

        }, 0); // No timeout delay necessary.
    });

    // Set Ink
    ionicMaterialInk.displayEffect();
    ////////////////////////////////////////////////////////////
    $scope.favorites = [];
    getFavorites();

    $scope.reload = function () {
        $scope.favorites = [];
        getFavorites();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.setProductDetail = function (productDetail) {
        offerFactory.setProductDetail(productDetail);
    }

    $scope.deleteProductFav = function (product) {
        $state.go('app.fav');
        var index = offerFactory.removeFavorite(product);
        if (index >= 0) {
            $scope.favorites.splice(index, 1);
        }
    }

    function getFavorites() {
        offerFactory.getFavorites(function (res) {
            $scope.favorites = res;
        });
    }
})

.controller('BuscarCtrl', function ($scope, $rootScope, $timeout, $ionicFilterBar) {

        $timeout(function () {
            document.getElementById('fab-activity').classList.toggle('on');
        }, 300);
        $scope.showFilterBar = function () {
            filterBarInstance = $ionicFilterBar.show({
                items: $rootScope.products,
                update: function (filteredItems) {
                    $rootScope.products = filteredItems;
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

  .controller('SearchCtrl', function ($scope, $timeout, $ionicScrollDelegate, ionicMaterialMotion, ionicMaterialInk, offerFactory, factory, $state) {

      $scope.$parent.showHeader();
      $scope.$parent.clearFabs();
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
      $scope.$parent.setHeaderFab(false);

      $scope.$on('ngLastRepeat.mylist', function (e) {
          $timeout(function () {
              ionicMaterialMotion.slideUp({
                  selector: '.slide-up'
              });

              ionicMaterialMotion.fadeSlideInRight({
                  startVelocity: 3000
              });

          }, 0); // No timeout delay necessary.
      });

      // Set Ink
      ionicMaterialInk.displayEffect();
      ////////////////////////////////////////////////////////////
      $scope.value = '';
      $scope.products = [];
      getAllOffers($scope.value);


      $scope.reload = function () {
          $scope.products = [];
          getAllOffers();
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.refreshComplete');
      };

      $scope.setProductDetail = function (productDetail) {
          productDetail.ProductStore = productDetail;
          offerFactory.setProductDetail(productDetail);
      }

      function getAllOffers() {
        if ($scope.value != '') {
          factory.getAllOffers($scope.value, 0).then(function (res) {
            $scope.products = res;
            $ionicScrollDelegate.$getByHandle('')['_instances'][0].freezeScroll(true);
          });
        } else {
          $scope.products = [];
        }
      }

      $scope.getAllOffers = getAllOffers;
  })
