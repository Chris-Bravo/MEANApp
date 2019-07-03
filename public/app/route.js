angular
    .module('AppRoutes', ['ngRoute'])
    .run(['$rootScope','Auth','$location', RoutesValidations])
    .config(function ($routeProvider, $locationProvider){
        
        $routeProvider
            .when('/home', {
                templateUrl: 'app/views/pages/home.html',
                authenticated: false
            })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html',
                authenticated: false
            })
            .when('/register', {
                templateUrl: 'app/views/pages/registration.html',            
                authenticated: false
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                authenticated: false
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/profile.html',
                authenticated: true
            })
            .when('/facebook/:token', {
                templateUrl: 'app/views/pages/social.html',
                controller: 'FacebookController',
                controllerAs: 'facebook',
                authenticated: true
            })
            .when('/facebookerror', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'FacebookController',
                controllerAs: 'facebook',
                authenticated: false
            })
            .when('/', {
                redirectTo: '/home'
            })
            .otherwise({
                templateUrl: 'app/views/pages/not-found.html',
                authenticated: false
            })
        
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
    })


    function RoutesValidations($rootScope, Auth, $location) {

        $rootScope.$on('$routeChangeStart', function(event, next, current){
            
            if(next.$$route){
                if(next.$$route.authenticated !== 'undefined'){
                    if(next.$$route.authenticated === true){
                        if(!Auth.isLoggedIn()) {
                            $location.path('/home')
                        }
                    } else if (next.$$route.authenticated === false){
                        if(Auth.isLoggedIn()) {
                            $location.path('/profile')
                        }
                    }
                }
            }
        })

    }