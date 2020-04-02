app.controller('hotArticlesController', ['HotArticlesService', 'angularLoad', function (HotArticlesService, angularLoad) {
    let vm = this;
    vm.ha = undefined;
    vm.frHa = undefined;


    vm.getHaFromServer = function () {
        HotArticlesService.getHA().then((response) => {
            let frObject = {};
            frObject.featuedResultsItems = response.map((result) => {
                return vm.createFeaturesResultsStructure(result)
            });
            frObject.moreTab = "remote";
            frObject.format = "thumbnails";
            frObject.searchLocations = "primo_central_multiple_fe";
            frObject.searchScopeSet = "like currently most used by bX";
            frObject.resourceType = "articles";
            console.log(frObject);
            vm.frHa = frObject;
            vm.ha = response;
        });
    }

    this.$onInit = function () {
        //vm.getHaFromServer();
        HotArticlesService.getHAFromFile("./inputBx.js");
    };


    vm.getHA = function () {
        return vm.ha;
    };
    vm.getFrHa = function () {
        return vm.frHa;
    }

    vm.createFeaturesResultsStructure = function (bxResponse) {
        let frObject = {
            isExpanded: false,
            recordId: bxResponse.bx_resourceID,
            originalBX: bxResponse,
            thumbnailLinks: [],
            generalData: bxResponse.bx_authorFullName,
            title: bxResponse.bx_jtitle + '/' + bxResponse.bx_atitle,
            type: "Article",
            nuiTitle: bxResponse.bx_jtitle + '/' + bxResponse.bx_atitl
        };
        return frObject;
    }
}]);

app.component('hotArticles', {
    bindings: {parentCtrl: '<'},
    controller: 'hotArticlesController',
    template: `
 <prm-featured-results ng-repeat-end class="bx-hot-articles-custom-featured-results"
                                  [featured-results]="$ctrl.getFrHa()"
                                  ng-if="$ctrl.getFrHa()"></prm-featured-results>`
});

