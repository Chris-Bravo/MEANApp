angular
    .module('UserApp', ['AppRoutes', 'UserServices', 'AuthServices'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors');
    })