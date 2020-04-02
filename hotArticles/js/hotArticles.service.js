app.service('HotArticlesService', ['restBaseURLs', '$http', '$location', 'angularLoad', '$sce', '$q', '$stateParams', function (restBaseURLs, $http, $location, angularLoad, $sce, $q, $stateParams) {
    let vm = this;


    vm.getHAFromFile = function (file) {
        $http.get(file).then((json)=>{
            json.map((record)=>{
                console.log(record.atitle + '&&&&&');
            })
        });
    };
    vm.getHAFromServer = function() {


        return $q((resolve, reject) => {
            let params = {
                'format': 'json',
                'token': 'primo-generic',
            };


            let url = 'http://rendertron01.poc.pmt.dc05.hosted.exlibrisgroup.com:3001';

            let conf = {
                url: url,
                method: 'GET',
                skipAuthorization: true,
                params: params,
                headers: {
                    'Authorization': 'a',
                    'Target-URL': 'http://bx.ha.service.exlibrisgroup.com/service/hotarticles'
                }
            };
            let haPromise = $http(conf).then((response) => {
                console.log(response.data);
                resolve(response.data);
            });

        });

    }



}]);