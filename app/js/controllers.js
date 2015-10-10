var BRAVEUtilControllers = angular.module('BRAVEUtilControllers', []);

BRAVEUtilControllers.controller('TitleBarCtrl', ['$scope', function($scope) {

}]);

BRAVEUtilControllers.controller('BridgeListCtrl', ['$scope', '$http', '$route', function($scope, $http, $route) {
    $http.get('https://intel.bravecollective.com/BraveIntelServer/map?region=jb').success(function(data) {
        $scope.bridges = data.bridges;
    }).error(function(data, status, headers, config) {
        if(status == 401) {
            $scope.loginRequired = true;
        }
    });

    $scope.reloadPage = function() {
        $route.reload();
    };

    $scope.copyGTS = function() {
        var output = "Region\tSystem / POS\tSystem / POS\tStatus\tOwner\tPassword\tDist (ly)\tRoute\tFriendly";
        for(var i = 0; i < $scope.bridges.length; i++) {
            var bridge = $scope.bridges[i];
            output += "\n-\t"+bridge.nameA+" @ "+bridge.planetA+"-"+bridge.moonA+"\t"+bridge.nameB+" @ "+bridge.planetB+"-"+bridge.moonB+"\tOnline\t-\t-\t0\t";
            if(bridge.friendly) output += "Green\tYes";
            else output += "Red\tNo";
        }

        document.oncopy = function(e) {
            e.clipboardData.setData("Text", output);
            e.preventDefault();
        };
        document.execCommand("Copy");
        document.oncopy = undefined;
    };
}]);

BRAVEUtilControllers.controller('BridgeDetailCtrl', ['$scope', '$http', '$routeParams', '$route', function($scope, $http, $routeParams, $route) {
    $scope.params = {
        from: parseInt($routeParams.bridgeFrom, 10),
        to: parseInt($routeParams.bridgeTo, 10)
    };

    $http.get('https://intel.bravecollective.com/BraveIntelServer/map?region=jb').success(function(data) {
        for(var i = 0; i < data.bridges.length; i++) {
            var bridge = data.bridges[i];
            if((bridge.idA == $scope.params.from && bridge.idB == $scope.params.to) || (bridge.idB == $scope.params.to && bridge.idA == $scope.params.from)) {
                $scope.bridge = bridge;
                break;
            } else {
                $scope.bridge = null;
            }
        }
    }).error(function(data, status, headers, config) {
        if(status == 401) {
            $scope.loginRequired = true;
        }
    });

    $scope.reloadPage = function() {
        $route.reload();
    };
}]);
