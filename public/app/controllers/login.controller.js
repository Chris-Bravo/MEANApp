angular
    .module('UserApp')
    .controller('LoginController', LoginController)

function LoginController($http, $location, Auth, $timeout) {

    var vm = this;

    vm.loginData = {};
    vm.sendData = sendData;
    vm.errorMsg;
    vm.loading;
    
    function sendData(){
        
        vm.loading = true;
        vm.errorMsg = false;

        Auth.loginUser(vm.loginData)
            .then(function(res) {
        
                if(res.data.success){
                    $timeout(function() {
                        vm.loading = false;
                        $location.path('/profile');
                    }, 1500)
        
                } else {
                    vm.loading = false;
                    vm.errorMsg = res.data.message;
                    vm.loginData.password = '';
                }
            })
            .catch(function(err){
                console.error(err);
            })
    }
}