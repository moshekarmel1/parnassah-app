var app = angular.module('parnassah');
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'MainCtrl',
        resolve: {
            postPromise: ['posts', function(posts){
                return posts.getAll();
            }]
        }
    })
    .state('add', {
        url: '/add',
        templateUrl: '/views/add.html',
        controller: 'MainCtrl'
    })
    .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/views/posts.html',
        controller: 'PostsCtrl',
        resolve: {
            post: ['$stateParams', 'posts', function($stateParams, posts) {
                return posts.get($stateParams.id);
            }]
        }
    })
    .state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('home');
            }
        }]
    })
    .state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
            if(auth.isLoggedIn()){
                $state.go('home');
            }
        }]
    });
    $urlRouterProvider.otherwise('home');
}])