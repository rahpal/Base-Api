# Base-Api
An api written in Javascript for centrallizing Ajax calls and returning response via Promise Object. This API is compliant with ECMA 2015 new features and syntaxs and is transpiled to ECMA 5 via Babel. 
##### How to install
npm install base-api
##### Dependencies
<strong>Angular</strong> for ng-base-api.js<br>
<strong>JQuery</strong> for amd-base-api.js
##### How to use
Include the files(as per your project requirement/technologies) and inject the module into your js files.

###### Eg.
<b>For Project based on AngularJS Framework</b><br>
angular.module('Module1').controller('DummyController', ['BaseApiFactory', function(baseApiFactory){
  baseApiFactory.get(...);
  baseApiFactory.get(...);
  baseApiFactory.get(...);
}]);


