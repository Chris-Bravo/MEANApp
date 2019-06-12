angular
    .module('UserApp')
    .controller('FacebookController', ['$routeParams', 'AuthToken', '$location', '$window', FacebookController])

function FacebookController($routeParams, AuthToken, $location, $window){
    
    var vm = this;

    if($window.location.pathname === '/facebookerror'){
        vm.errorMsg = 'Facebook email not found in database'
    } else {
        AuthToken.setToken($routeParams.token);
        $location.path('/profile');
    }
}