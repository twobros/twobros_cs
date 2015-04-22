var codeSplitter = angular.module('codeSplitter', ['ngRoute']);

codeSplitter.config(function ($routeProvider) {
    $routeProvider
    
        .when('/', {
            templateUrl: 'pages/add.html',
            controller: 'navController'
        })
        .when('/add', {
            templateUrl: 'pages/add.html',
            controller: 'navController'
        })
        .when('/projects', {
            templateUrl: 'pages/projects.html',
            controller: 'navController'
        })
        .when('/contacts', {
            templateUrl: 'pages/contacts.html',
            controller: 'navController'
        })
});

codeSplitter.controller('navController', ['$scope', '$log', '$location', function ($scope, $log, $location) {
console.log($location.url())
$scope.isActive = function (viewLocation) {
  console.log(viewLocation)
     var active = (viewLocation === $location.url());
  console.log(active)
     return active;
};

}]);

codeSplitter.directive('navMenu', function($location) {
  console.log("hej")
  return function(scope, element, attrs) {
    var links = element.find('a'),
        onClass = attrs.navMenu || 'on',
        routePattern,
        link,
        url,
        currentLink,
        urlMap = {},
        i;

    if (!$location.$$html5) {
      routePattern = /^#[^/]*/;
    }

    for (i = 0; i < links.length; i++) {
      link = angular.element(links[i]);
      url = link.attr('href');

      if ($location.$$html5) {
        urlMap[url] = link;
      } else {
        urlMap[url.replace(routePattern, '')] = link;
      }
    }

    scope.$on('$routeChangeStart', function() {
      var pathLink = urlMap[$location.path()];

      if (pathLink) {
        if (currentLink) {
          currentLink.removeClass(onClass);
        }
        currentLink = pathLink;
        currentLink.addClass(onClass);
      }
    });
  };
});