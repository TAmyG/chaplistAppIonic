angular.module('starter', ['ionic', 'ngCordova', 'appCtrl', 'offerCtrl', 'profileCtrl',
                           'actionFactory', 'facebookFactory', 'mapsFactory', 'datatables', 'ngStorage',
                          'ionic-material'])

.run(function ($ionicPlatform) { //agrego el factory de GoogleMaps
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/sidemenu.html',
            controller: 'AppCtrl'
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                },
                'fabContent': {
                    template: ''
                }
            }
        })
        .state('app.offer', {
            url: '/offer',
            views: {
                'menuContent': {
                    templateUrl: 'views/offer.html',
                    controller: 'OfferCtrl as offer'
                },
                'fabContent': {
                    template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap" style="color: transparent; background-color: transparent; border-color: transparent; cursor: default;" disabled><i class="icon ion-paper-airplane"></i></button>',
                    controller: function ($timeout) {
                        $timeout(function () {
                            document.getElementById('fab-activity').classList.toggle('on');
                        }, 200);
                    }
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'views/profile.html',
                    controller: 'ProfileCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-profile" ng-click="facebookLogout()" class="button button-fab button-fab-bottom-right button-energized-900" ><i class="icon ion-log-out"></i></button>',
                    controller: 'btnLogoutCtrl'
                }
            }
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'views/map.html',
                    controller: 'MapCtrl'
                },
                'fabContent': {
                    template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap" ng-click= "refreshMap()"><i class="icon ion-ios-refresh"></i></button>',
                    controller: 'btnRefreshCtrl'
                }
            }
        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
})
