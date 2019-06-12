angular
    .module('UserApp')
    .controller('RegistrationController', ['$location', 'User', '$timeout', 'Auth', RegistrationController])

function RegistrationController($location, User, $timeout, Auth) {

    var vm = this;

    vm.regData = {};
    vm.sendData = sendData;
    vm.loading;
    vm.errorMsg;
    
    function sendData(){

        vm.loading = true;
        vm.errorMsg = false;
        User.createUser(vm.regData)
            .then(function(res) {
                if(res.data.success){

                    Auth.loginUser({username: vm.regData.username, password: vm.regData.password})
                        .then(function(res) {
                            if(res.data.success){
                                $timeout(function() {
                                    vm.loading = false;
                                    $location.path('/profile');
                                }, 1500)
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
                console.error(err);
            })
    }
}