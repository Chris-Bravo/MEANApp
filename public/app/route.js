angular
    .module('AppRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider){
        
        $routeProvider
            .when('/home', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/about', {
                templateUrl: 'app/views/pages/about.html'
            })
            .when('/register', {
                templateUrl: 'app/views/pages/registration.html'            
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html'
            })
            .when('/profile', {
                templateUrl: 'app/views/pages/profile.html'
            })
            .when('/facebook/:token', {
                templateUrl: 'app/views/pages/social.html'
            })
            .when('/', {
                redirectTo: '/home'
            })
            .otherwise({
                templateUrl: 'app/views/pages/not-found.html'
            })
        
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
            })
    })