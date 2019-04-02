app.controller('IndicatorsFeaturedController', ['$scope', '$translate', '$window', 'webPartPropertiesModel', 'indicadorFeaturedService', function ($scope, $translate, $window, webPartPropertiesModel, indicadorFeaturedService) {
    var self = this;

    $scope.model = {
        properties: null,
        error: null
    };

    $scope.open = function (url) {
        if (url)
            $window.open(url, '_blank');
    };

    self.initLanguage = function () {
        var result = window.location.pathname.split('/')[1]
        $translate.use(result.toLowerCase());
    }

    function init() {
        self.initLanguage();

        $scope.model.properties = webPartPropertiesModel;

        if (!$scope.model.properties.ListUrl) {
            $scope.model.error = "Erro a carregar lista. Verifique o url";
        }

        if (!$scope.model.error) {
            if ($scope.model.properties.AllItemsURL) {
                $scope.indicatorsFeaturedUrl = true;
                $scope.moreData = $scope.model.properties.AllItemsURL;
            }
            getIndicatorsFeatured();
        }
    }

    function getIndicatorsFeatured() {
        indicadorFeaturedService.getIndicatorsFeatured($scope.model.properties).then(function (data) {
            if (data) {
                for (var i = 0; i < data.IndicadorList.length; i++) {
                    if (data.IndicadorList[i].Position.toString().length == 1) {
                        data.IndicadorList[i].Position = "0" + data.IndicadorList[i].Position;
                    }
                }

                shuffle(data.IndicadorList);
                $scope.indicators = data;

                self.tiles = buildGridModel({
                    icon: "",
                    title: "Svg-",
                    background: ""
                });
            }
        });
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function buildGridModel(tileTmpl) {
        var maxTiles = 3;
        var it, results = [];

        function renderIt(it) {
            it.title = $scope.indicators.IndicadorList[j].Title;
            it.icon = $scope.indicators.IndicadorList[j].IconUrl;
            it.shortName = $scope.indicators.IndicadorList[j].ShortName;
            it.value = $scope.indicators.IndicadorList[j].Value;
            it.moreInfoUrl = $scope.indicators.IndicadorList[j].MoreInfoUrl;
            it.background = $scope.indicators.IndicadorList[j].CellColor;

            if (j == 0) {
                it.span = { row: 1, col: 4 };
                it.firstLast = true;
            }
            if (j == 1) {
                it.span = { row: 2, col: 4 };
            }
            if (j == 2) {
                it.span = { row: 2, col: 4 };
            }
            if (j == 3) {
                it.span = { row: 1, col: 4 };
                it.firstLast = true;
            }

            if (it.moreInfoUrl)
                it.existsUrl = true;
            return it;
        }

        for (var j = 0; j <= maxTiles; j++) {
            if (j > 0 && $scope.indicators.IndicadorList[j]) {
                if (results.length > maxTiles)
                    break;
            }

            it = angular.extend({}, tileTmpl);

            if ($scope.indicators.IndicadorList[j]) {
                it = renderIt(it);
                results.push(it);
            }
        }

        return results;
    }

    init();
}
]);
