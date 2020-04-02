app.component('prmBriefResultContainerAfter', {
    bindings: {parentCtrl: '<'},
    template: `<hot-articles parent-ctrl="$ctrl.parentCtrl" ng-if="$ctrl.parentCtrl.index === 3"></hot-articles>`
});