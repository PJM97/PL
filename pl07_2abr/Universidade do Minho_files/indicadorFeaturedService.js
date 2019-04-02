app.factory('superCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('super-cache');
}]);

app.service('indicadorFeaturedService', ['$http', '$q', 'superCache', function ($http, $q, superCache) {
    'use strict';
    var self = this;

    self.pageSize = 12;
    self.currentAlbumTitleStr = '';

    function init() {
        self.spHostUrl = self.getRootUrl();
    }

    this.getRootUrl = function () {
        return window.location.origin ? window.location.origin : window.location.protocol + '//' + window.location.host;
    }

    //Indicators Featured
    this.getIndicatorsFeatured = function (wpIndicatorsFeaturedProperties) {
        if (wpIndicatorsFeaturedProperties.ListUrl) {
            var req = {
                method: 'POST',
                url: self.spHostUrl + "/_vti_bin/UMinho.PortalUM.UI/Services/Portaldata.svc/indicadores/featured",
                data: {
                    ListUrl: self.spHostUrl + wpIndicatorsFeaturedProperties.ListUrl
                }
            };

            var deferred = $q.defer();
            $http(req).success(function (results) {
                if (results.GetFeaturedIndicadoresResult.Success == true) {
                    deferred.resolve(results.GetFeaturedIndicadoresResult);
                }
                else
                    deferred.resolve(null);
            }).error(function (reason) {
                //$log.error(reason);
                deferred.reject('Não foi possivel processar o seu pedido. Tente mais tarde.', reason);
            });
            return deferred.promise;
        }
    }

    init();
}]);
