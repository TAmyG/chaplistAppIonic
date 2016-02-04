angular.module('offerCtrl', [])

.controller('OfferCtrl', function ($scope, $state, $ionicPopup, $timeout, ionicMaterialMotion, ionicMaterialInk, FacebookFactory) {

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
    /*----------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------*/
    $scope.get = function(){
        FacebookFactory.getFacebookFriends(function(res){
            $ionicPopup.alert({
                title: 'resultado',
                template: JSON.stringify(res)
            });
        });
    }
})
