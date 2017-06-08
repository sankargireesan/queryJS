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


    $scope.convertMemory = (m) => {
      var memory = parseFloat(m);

      memory = memory/(1024*1024*1024);

      if(memory >= 1.0){
        return memory.toString()+"Gi";
      }
      memory *=1024;

      if(memory >= 1.0){
        return memory.toString()+"Mi";
      }
      memory *=1024;

      if(memory >= 1.0){
        return memory.toString()+"Ki";
      }
      memory *=1024;

      return memory;
    };


    $scope.b = function(){
  return 4;
};

});
