angular
    .module('UserApp')
    .controller('LoginController', LoginController)

function LoginController($http, $location, Auth, $timeout) {

    var vm = this;
    vm.loginData = {};
    vm.sendData = sendData;
    
    function sendData(logForm){
        vm.loading = true;
        vm.errorMsg = false;
        Auth.loginUser(vm.loginData)
            .then(function(res) {
                if(res.data.success){
                    vm.successMsg = res.data.message;
                    $timeout(function() {
                        vm.loading = false;
                        $location.path('/profile');
                    }, 2000)
                } else {
                    vm.loading = false;
                    vm.errorMsg = res.data.message;
                    vm.loginData.password = '';
                }
            })
    }
}