// js/services/todos.js
angular.module('blogService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Blogs', function($http) {
        return {
            get : function() {
                return $http.get('/api/blogs');
            },
            create : function(blogData) {
                return $http.post('/api/blogs', blogData);
            },
            delete : function(id) {
                return $http.delete('/api/blogs/' + id);
            },
            update : function(id) {
            	return $http.update('/api/blogs/' + id);
            }
        }
    });
