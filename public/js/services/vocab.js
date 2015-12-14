
angular.module('vocabService', [])

	.factory('Vocab', function($http) {
		return {
			get : function(vocabTerm) {
				return $http.get('api/vocab/' + vocabTerm);
			},
			
			create : function(vocabTerm) {
				return $http.post('api/vocab/', vocabTerm);
			}
		}
	});
