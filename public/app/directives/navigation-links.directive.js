angular
    .module('UserApp')
    .directive('navigationLinks', navigationLinks);

function navigationLinks() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/directives/navigation-links.directive.html',
        controller: NavigationLinksController,
        controllerAs: 'vm',
        transclude: true
    };
}

function NavigationLinksController($rootScope, Auth, $location) {

    var vm = this;
    vm.logout = logout;
    vm.isActive = isActive;

    $rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()) {
            Auth.getUser()
                .then(function() {
                    vm.isLoggedIn = true;
                })
        } else {
            vm.isLoggedIn = false;
        }
    })

    function logout() {
        Auth.logout();
        $location.path('/');
    }

    function isActive(route){

        var currentRoute = $location.path();

        if(currentRoute === '/register'){
            currentRoute = '/login';
        }

        return route === currentRoute;
    }
}