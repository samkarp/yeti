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
		

		//Orabelle
		.state('yeti.orabelle', {
			url: 'orabelle/',
			views: {
				'content@': {
					templateUrl: 'views/orabelle.html',
					controller: 'OrabelleCtrl'
				}
			}
		})
		.state('yeti.orabelle.create', {
			url: 'create',
			views: {
				'content@': {
					templateUrl: 'views/templates/addOrabelle.html',
					controller: 'OrabelleCtrl'
				}
			}
		})
		.state('yeti.orabelle.view', {
			url: ':orabelleId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewOrabelle.html',
					controller: 'OrabelleCtrl'
				}
			}
		})
		.state('yeti.orabelle.edit', {
			url: 'edit/:orabelleId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editOrabelle.html',
					controller: 'OrabelleCtrl'
				}
			}
		})

		//Elephants
		.state('yeti.hoss', {
			url: 'hoss/',
			views: {
				'content@': {
					templateUrl: 'views/hoss.html',
					controller: 'HossCtrl'
				}
			}
		})
		.state('yeti.hoss.create', {
			url: 'create',
			views: {
				'content@': {
					templateUrl: 'views/templates/addHoss.html',
					controller: 'HossCtrl'
				}
			}
		})
		.state('yeti.hoss.view', {
			url: ':hossId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewHoss.html',
					controller: 'HossCtrl'
				}
			}
		})
		.state('yeti.hoss.edit', {
			url: 'edit/:hossId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editHoss.html',
					controller: 'HossCtrl'
				}
			}
		})

		//Monkeys
				.state('yeti.titan', {
			url: 'titan/',
			views: {
				'content@': {
					templateUrl: 'views/titan.html',
					controller: 'TitanCtrl'
				}
			}
		})
		.state('yeti.titan.create', {
			url: 'create',
			views: {
				'content@': {
					templateUrl: 'views/templates/addTitan.html',
					controller: 'TitanCtrl'
				}
			}
		})
		.state('yeti.titan.view', {
			url: ':titanId',
			views: {
				'content@': {
					templateUrl: 'views/templates/viewTitan.html',
					controller: 'TitanCtrl'
				}
			}
		})
		.state('yeti.titan.edit', {
			url: 'edit/:titanId',
			views: {
				'content@': {
					templateUrl: 'views/templates/editTitan.html',
					controller: 'TitanCtrl'
				}
			}
		})

		;
}]);