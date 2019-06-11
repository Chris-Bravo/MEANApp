angular
    .module('UserApp')
    .controller('RegistrationController', registrationController)

function registrationController($http, $location, User, $timeout, Auth) {

    var vm = this;
    vm.regData = {};
    vm.sendData = sendData;
    
    function sendData(regForm){
        vm.loading = true;
        vm.errorMsg = false;
        User.createUser(vm.regData)
            .then(function(res) {
                if(res.data.success){
                    vm.successMsg = res.data.message;
                    Auth.loginUser({username: vm.regData.username, password: vm.regData.password})
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
                            }
                        })
                } else {
                    vm.loading = false;
                    vm.errorMsg = res.data.message;
                }
            })
            .catch(function(err) {
                console.log(err);
            })
    }

}