angular.module('queryJS', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.clusterData = {};
  // Get all todos
  $http.get('/cluster')
  .success((data) => {
    $scope.clusterData = data;
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createTodo = () => {
    $http.post('/api/v1/todos', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.todoData = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };



  //get Node
    $scope.getNodes = (clusterName) => {
      $scope.clusterName = clusterName;
      $http.get('/cluster/'+clusterName+'/node')
          .success((data) => {
              $scope.nodeData = data;
              $scope.podData = null;
          })
          .error((error) => {
              console.log('Error: ' + error);
          });
    };



    //get Node
    $scope.getPod = (nodeName) => {
        $http.get('/cluster/'+$scope.clusterName+'/node/'+nodeName)
            .success((data) => {
                $scope.podData = data;
            })
            .error((error) => {
                console.log('Error: ' + error);
            });
    };


});
