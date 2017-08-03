angular.module("businessAddStores", [])

.controller('AddStoresCtrl', function($scope, $ionicModal,$firebaseArray, $ionicPopup) {

  var name = ""

    //get currentUser uid
    var userData = firebase.auth().currentUser.uid


    //get a reference to our database
  var storeRef = firebase.database().ref("stores")

  var userRef = firebase.database().ref("users/" + userData)


  //when we enter home, get user creds

      $scope.$on("$ionicView.enter", function(){

       userCreds = $firebaseArray(userRef)
        userCreds.$loaded(function(creds){

        var nameInfo = creds[1]
  
        name = nameInfo.$value
    
  })
       
    })

 
  
   $ionicModal.fromTemplateUrl("templates/business/storeModal.html", {
    scope: $scope,
    animation: "slide-in-up"
  })
  
  .then(function(modal){
    $scope.modal = modal;
     
  });

    $scope.openModal = function() {
    $scope.modal.show();
  };

 
  $scope.addStore = function(store) {

    $scope.store = {
    name: store.name
      
    }
    
    var obj = {}

    obj[$scope.store.name] = []
    obj[$scope.store.name].push(name)
    //save to databse
    storeRef.update(obj)

    userRef.update({

      "store":$scope.store.name
    })

    .then(function(){

     $ionicPopup.alert({
     title: 'Add Store',
     template: 'Store Created!'

     //go to home
   });
    })
  }
  
 })