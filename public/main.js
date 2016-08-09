let app = angular.module('main', []);

app.controller('ctrl', ['$scope', function($scope) {
	$scope.data = serverData;
	$scope.reportData = function() {
		console.log('data', $scope.data);
	}
}]);

app.directive('ngcms', function(){
	return {
		restrict: 'E',
		scope: {
			submit: '&',
			data: '='
		},
		transclude: true,
		template: '<div ng-transclude></div>',
		controller: ['$scope', function($scope) {
			this.submit = function(){
				$scope.submit();
			};
		}]
	}
});

app.directive('ngcmsTextarea', function(){
	return {
		restrict: 'E',
		require: '^^ngcms',
		scope: {
			data: '=',
			edit: '&'
		},
		template: '<div>\
		<p ng-repeat="text in data" ng-click="edit()" ng-hide="!!editing" ng-bind="text"></p>\
		<span ng-show="!!editing">\
		<textarea ng-model="textAreaText"></textarea>\
		<ngcms-save save="save()"></ngcms-save>\
		<ngcms-cancel cancel="cancel()">cancel</ngcms-cancel>\
		</span>\
		</div>',
		link: function(scope, element, attrs, controller) {
			scope.editing = false;
			scope.textAreaText = scope.data.join('\n');
			scope.edit = function() {
				scope.editing = true;
			};
			scope.save = function() {
				scope.data = scope.textAreaText.split('\n');
				scope.editing = false;
			};
			scope.cancel = function() {
				scope.editing = false;
			};
		}
	}
});

app.directive('ngcmsSave', function(){
	return {
		restrict: 'E',
		scope: {
			save: '&'
		},
		template: '<button ng-click="save()" class="save">save</button>'
	}
});

app.directive('ngcmsCancel', function(){
	return {
		restrict: 'E',
		scope: {
			cancel: '&'
		},
		template: '<button ng-click="cancel()" class="cancel">cancel</button>'
	}
});

app.directive('ngcmsSubmit', function(){
	return {
		restrict: 'E',
		require: '^^ngcms',
		scope: {},
		template: '<button ng-click="submit({\'data\':data})">submit</button>',
		link: function(scope, element, attrs, controller) {
			scope.submit = function() {
				controller.submit();
			}
		}
	}
});