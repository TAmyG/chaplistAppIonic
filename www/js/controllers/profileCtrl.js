angular.module('profileCtrl', [])

.controller('ProfileCtrl', function ($scope, $state, $timeout, $ionicPopup, ionicMaterialMotion, ionicMaterialInk, FacebookFactory) {
    // Set Header
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
    /*----------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------*/

    $scope.facebookProfile = FacebookFactory.getFacebookProfileLocal();
    FacebookFactory.getFacebookFriends(function (res) {
        $scope.facebookFriends = res;
    });

    $scope.facebookPost = function () {
        facebookConnectPlugin.showDialog({
                method: 'share',
                href: 'https://developers.facebook.com/docs/',
                name: 'Test Post',
                message: 'First photo post',
                caption: 'Testing using phonegap plugin',
                description: 'Posting photo using phonegap facebook plugin'
            },
            function (response) {
                $ionicPopup.alert({
                    title: 'resultado',
                    template: JSON.stringify(result)
                });
            },
            function (response) {
                $ionicPopup.alert({
                    title: 'Falló',
                    template: error
                });
            },
            function (response) {
                alert(JSON.stringify(response))
            },
            function (response) {
                alert(JSON.stringify(response) + 'error')
            }
        );
    }
})
