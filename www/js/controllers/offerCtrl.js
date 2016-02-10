angular.module('offerCtrl', [])

.controller('OfferCtrl', function ($scope, $state, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory, factory) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function () {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in.item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
    /*----------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------*/
    $scope.get = function(){
        $ionicPopup.alert({
                title: 'resultado',
                template: factory.token()
        });

        factory.getStoresAPI(3)
            .then(function(res){
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
.controller('ProductCtrl', function ($scope, $timeout, ionicMaterialMotion, ionicMaterialInk) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });
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

    $timeout(function () {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})
