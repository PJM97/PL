var app = angular.module('indicatorsFeaturedApp', ['pascalprecht.translate', 'ngMaterial', 'ngMessages']);

app.run(function (webPartPropertiesModel, webPartProperties) {
    angular.extend(webPartPropertiesModel, webPartProperties);
});
app.value('webPartPropertiesModel', {
    id: Math.random() * 888 << 0
});

app.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: '../_layouts/15/UMinho.PortalUM.UI/js/app/resources/',
        suffix: '.txt'
    });
    $translateProvider.preferredLanguage('pt');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
}]);

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// rever esta magia
$(document).ready(function () {
    var indicatorsFeaturedAppElems = angular.element(document.querySelectorAll('div[id^="indicatorsFeaturedApp"]'));

    if (indicatorsFeaturedAppElems.length > 0) {
        for (var i = 0; i < indicatorsFeaturedAppElems.length; i++) {

            if (indicatorsFeaturedAppElems[i].id != ("indicatorsFeaturedApp" + i)) {
                indicatorsFeaturedAppElems[i].id = "indicatorsFeaturedApp" + i;
            }
        }

        var thisIsBootstrapped = false;

        for (var i = 0; i < indicatorsFeaturedAppElems.length; i++) {

            var thisIndicatorsFeaturedAppElement =
                angular.element(document.querySelector("#" + indicatorsFeaturedAppElems[i].id));
            var isInitialized = thisIndicatorsFeaturedAppElement.injector();

            if (!isInitialized && !thisIsBootstrapped) {

                var webPartProperties = thisIndicatorsFeaturedAppElement.children()[0].innerHTML;
                webPartProperties = JSON.parse(webPartProperties.replaceAll('\'', ''));

                angular.module('webPartProp', []).value('webPartProperties', webPartProperties);

                // bootstrap this html to angular
                angular.bootstrap(thisIndicatorsFeaturedAppElement, ['indicatorsFeaturedApp', 'webPartProp']);

                thisIsBootstrapped = true;
            }
        }
    }
});