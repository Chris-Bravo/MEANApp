angular
    .module('UserApp')
    .directive('navigationLinks', NavigationLinks);

function NavigationLinks() {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/navigation-links.directive.html',
        controller: NavigationLinksController,
        controllerAs: 'vm'
    };
}

function NavigationLinksController($rootScope, Auth, $location) {

    var vm = this;

    vm.logout = logout;
    vm.isActive = isActive;
    vm.isLoggedIn;

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

    if(Auth.isLoggedIn()) {
        Auth.getUser()
            .then(function() {
                vm.isLoggedIn = true;
            })
    } else {
        vm.isLoggedIn = false;
    }

    function logout() {
        Auth.logout();
        $location.path('/login');
    }

    function isActive(route){

        var currentRoute = $location.path();

        if(currentRoute === '/register'){
            currentRoute = '/login';
        }

        return route === currentRoute;
    }
}