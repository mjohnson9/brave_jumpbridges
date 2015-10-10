var BRAVEUtilApp = angular.module('BRAVEUtilApp', ['ngRoute', 'BRAVEUtilControllers']);

BRAVEUtilApp.config(['$compileProvider', '$routeProvider', function($compileProvider, $routeProvider) {
    var sanitizationWhitelist = /^\s*(https?|ftp|mailto|file|chrome-extension):/;
    $compileProvider.aHrefSanitizationWhitelist(sanitizationWhitelist).imgSrcSanitizationWhitelist(sanitizationWhitelist);

    $routeProvider.
        when('/', {
            templateUrl: 'partials/index.html'
        }).
        when('/bridges', {
            templateUrl: 'partials/bridges.html',
            controller: 'BridgeListCtrl'
        }).
        when('/bridges/:bridgeFrom-:bridgeTo', {
            templateUrl: 'partials/bridge_detail.html',
            controller: 'BridgeDetailCtrl'
        });
}]);

BRAVEUtilApp.filter('onlySystems', function() {
    return function(reports, systems) {
        reports = reports || [];
        systems = systems || [];

        if(systems.length <= 0 || reports.length <= 0) {
            return reports;
        }

        var systemsMap = {};
        for(var i = 0; i < systems.length; i++) {
            systemsMap[systems[i]] = true;
        }

        var output = [];

        for(var i = 0; i < reports.length; i++) {
            var report = reports[i];
            var matched = false;
            for(var j = 0; j < report.systems.length; i++) {
                var system = report.systems[i];
                if(systemsMap[system] === true) {
                    matched = true;
                    break;
                }
            }

            output.push(report);
        }

        return output;
    };
});

BRAVEUtilApp.filter('romanize', function() {
    return function(input) {
        var digits = String(+input).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    };
});
