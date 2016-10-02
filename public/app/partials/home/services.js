evezownApp
    .factory('AccountService', function ($http, Session, PATHS) {

        AccountService = {};

        AccountService.signup = function (credentials) {
            return $http
                .post(PATHS.api_url + 'signup', credentials)
                .then(function (res) {
                    Session.create(res.data.data.api_key, res.data.data.id, res.data.data.firstname, res.data.data.lastname,
                        res.data.data.role);
                    return res.data.user;
                });
        };

        return AccountService;
    });