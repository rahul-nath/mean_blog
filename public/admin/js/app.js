
var adminApp = angular.module('mean-starter.admin', [
    'ui.router',
    'btford.markdown'
]);

adminApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('allPosts', {
            url: '/',
            templateUrl: '/admin/templates/allPosts.html'
        })
        .state('addPost', {
            url: '/addPost',
            templateUrl: '/admin/templates/addPost.html'
        })
});

// do I need this shit?

// var app = angular.module('mean-boilerplate', [
// 	'ui.router'
// ]);

// app.config(function($stateProvider, $urlRouterProvider){
// 	$stateProvider
// 		.state('home', {
// 			url: "/",
// 			templateUrl: "templates/main.html",
// 			controller: 'MainCtrl'
// 		});

// 	$urlRouterProvider.otherwise("/");
// });