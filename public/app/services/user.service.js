angular
    .module('UserServices', [])
    .factory('User', User)

function User($http){

    userFactory = {};

    userFactory.createUser = function(regData) {
        return $http.post('/api/users', regData)
    }

    return userFactory;
}