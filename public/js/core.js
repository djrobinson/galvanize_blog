// js/core.js

angular.module('galvanizeBlog', ['ngRoute', 'routingApp', 'blogController', 'blogService', 'vocabService', 'ui.tinymce','ngSanitize']);


//So after 2 days of work, it looks like I needed to create a whole new module for my routing app.  I just 
//didn't know where to put it. Dammit.
angular.module('routingApp', [])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/vocab/:vocabTerm', {
				templateUrl: 'test.html',
				controller: 'vocabController',
				
				resolve: {
					someData: function($route){
						return $route.current.params.vocabTerm;
					}
				}
		})
	}])


//	.factory('vocabService', function($http){
//		return{
//			get : function(vocabTerm) {
//					return $http.get('api/vocab/' + vocabTerm);
//		}
//	}





