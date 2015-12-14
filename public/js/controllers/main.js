// js/controllers/main.js
angular.module('blogController', [])

	

    // inject the Todo service factory into our controller
    .controller('mainController', function($scope, $http, $sce, $routeParams, Blogs, Vocab) {
        $scope.formData = {};
        $scope.tinymceoptions = {
			  selector: "textarea",  // change this value according to your HTML
			  plugins: "link"
			}

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Blogs.get()
            .success(function(data) {
                $scope.blogs = data;
                $scope.blogs.text = $sce.trustAsHtml(data.text);
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createBlog = function() {
				console.log($scope.formData.title);
            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            // people can't just hold enter to keep adding the same to-do anymore
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Blogs.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.blogs = data; // assign our new list of todos
                    });
            	}
        };
      
        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteBlog = function(id) {
            Blogs.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.blogs = data; // assign our new list of todos
                });
        };
        
          
    			
    		$scope.createVocab = function() {
    			Vocab.create($scope.formData)
    				.success(function(data) {
    					$scope.formData = {};
    				});
    		};
        
    		

    })
    
    .controller('vocabController', ['$scope', '$sce', 'someData', 'Vocab', function($scope, $sce, someData, Vocab) {

			console.log(someData);
			Vocab.get(someData)
				 			
				 			.success(function(data) {
				 				console.log(data[0].word);
				 				$scope.vocab = data[0];
				 				$scope.vocab.defnition = data[0].definition;
				 	});
    }]);
    		
    		
//     // UPDATE -- Commenting until needed.
//        $scope.editBlog = function(id) {
//        
//        		Blogs.update(id)
//        			.success(function(data) {
//        				$scope.formData = {};
//        				$scope.blogs = data;
//        			});
//        };
//        
//      function shouldShowEditing() {
//          return $scope.isEditing && !$scope.isCreating;
//      }

//      function startEditing() {
//          $scope.isCreating = false;
//          $scope.isEditing = true;
//      }

//      function cancelEditing() {
//          $scope.isEditing = false;
//          $scope.editedBookmark = null;
//      }

//      $scope.startEditing = startEditing;
//      $scope.cancelEditing = cancelEditing;
//      $scope.shouldShowEditing = shouldShowEditing;

    
   
    
    


	
    
    
