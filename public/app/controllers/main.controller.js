angular
    .module('UserApp')
    .controller('MainController', MainController)

function MainController(Auth, $rootScope, $location) {

    var vm = this;
    vm.user = {};
    vm.openMenu = openMenu;
    vm.closeMenu = closeMenu;
    vm.isMenuActive = false;

    $rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()) {
            Auth.getUser()
                .then(function(data) {
                    vm.user.username = data.data.username;
                    vm.user.email = data.data.email;
                    vm.user.firstName = data.data.firstName;
                    vm.user.lastName = data.data.lastName;
                    vm.user.description = data.data.description;
                    vm.user.firstLetter = vm.user.firstName.charAt(0);
                    vm.user.secondLetter = vm.user.lastName.charAt(0);
                    vm.isLoggedIn = true;
                })
        } else {
            vm.isLoggedIn = false;
            vm.user = {};
        }
    })

    function openMenu() {
        vm.isMenuActive = true;
    }
    function closeMenu() {
        vm.isMenuActive = false;
    }
}