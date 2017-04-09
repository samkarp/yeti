var app = angular.module('yeti');

app.config(['$stateProvider', '$urlRouterProvider', '$logProvider', function($stateProvider, $urlRouterProvider, $logProvider){
	$urlRouterProvider.otherwise('/');
	$logProvider.debugEnabled(true);

	$stateProvider
		.state('yeti', {
			url: '/',
			views: {
				'header': {
					templateUrl: 'views/templates/header.html'
				},
				'content': {
					templateUrl: 'index.html'
				},
				'footer': {
					templateUrl: 'views/templates/footer.html'
				}
			}
		})
		.state('yeti.claymore', {
			url: 'claymore/',
			views: {
				'content@': {
					templateUrl: 'views/claymore.html',
					controller: 'ClaymoreCtrl'
				}
			}
		})
		.state('yeti.claymore.create', {
			url: 'create',
			views: {
				'content@': {
					templateUrl: 'views/templates/addClaymore.html',
					controller: 'ClaymoreCtrl'
				}
			}
		})
		.state('yeti.claymore.view', {
			url: ':claymoreId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewClaymore.html',
					controller: 'ClaymoreCtrl'
				}
			}
		})
		.state('yeti.claymore.edit', {
			url: 'edit/:claymoreId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editClaymore.html',
					controller: 'ClaymoreCtrl'
				}
			}
		})
		

		//Cats
		.state('yeti.cats', {
			url: 'cats/',
			views: {
				'content@': {
					templateUrl: 'views/cats.html',
					controller: 'CatCtrl'
				}
			}
		})
		.state('yeti.cats.view', {
			url: ':catId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewCat.html',
					controller: 'CatCtrl'
				}
			}
		})
		.state('yeti.cats.edit', {
			url: 'edit/:catId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editCat.html',
					controller: 'CatCtrl'
				}
			}
		})

		//Elephants
		.state('yeti.elephants', {
			url: 'elephants/',
			views: {
				'content@': {
					templateUrl: 'views/cats.html',
					controller: 'CatCtrl'
				}
			}
		})
		.state('yeti.elephants.view', {
			url: ':elephantId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewElephant.html',
					controller: 'ElephantCtrl'
				}
			}
		})
		.state('yeti.elephants.edit', {
			url: 'edit/:elephantId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editElephant.html',
					controller: 'ElephantCtrl'
				}
			}
		})

		//Monkeys
		.state('yeti.monkeys', {
			url: 'monkeys/',
			views: {
				'content@': {
					templateUrl: 'views/cats.html',
					controller: 'MonkeyCtrl'
				}
			}
		})
		.state('yeti.monkeys.view', {
			url: ':monkeyId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewMonkey.html',
					controller: 'MonkeyCtrl'
				}
			}
		})
		.state('yeti.monkeys.edit', {
			url: 'edit/:monkeyId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editMonkey.html',
					controller: 'MonkeyCtrl'
				}
			}
		})

		;
}]);