angular
    .module('AuthServices', [])
    .factory('Auth', Auth)
    .factory('AuthToken', AuthToken)
    .factory('AuthInterceptors', AuthInterceptors)

function Auth($http, AuthToken, $q){

    authFactory = {};

    authFactory.loginUser = function(loginData) {
        return $http.post('/api/authenticate', loginData)
            .then(function(data) {
                AuthToken.setToken(data.data.token);
                return data;
            })
            .catch(function(err){
                console.error(err)
            })
    }
    authFactory.getUser = function() {
        if (AuthToken.getToken()) {
            return $http.post('/api/me')
        } else {
            return $q.reject({ message: 'User has no token'})
        }
    }

    authFactory.isLoggedIn = function() {
        if(AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    }
    authFactory.logout = function() {
        AuthToken.removeToken();
    }

    return authFactory;
}

function AuthToken($window){

    authTokenFactory = {};
    
    authTokenFactory.setToken = function(token) {
        $window.localStorage.setItem('token', token);
    }
    authTokenFactory.getToken = function() {
        if($window.localStorage.getItem('token') == 'undefined') {
            authTokenFactory.removeToken();
        }
        return $window.localStorage.getItem('token');
    }
    authTokenFactory.removeToken = function() {
        $window.localStorage.removeItem('token');
    }
    
    return authTokenFactory;
}

function AuthInterceptors(AuthToken){

    authInterceptorsFactory = {};
    
    authInterceptorsFactory.request = function(config) {

        var token = AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    }

    return authInterceptorsFactory;
}