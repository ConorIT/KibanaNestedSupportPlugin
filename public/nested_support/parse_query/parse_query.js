import {toUser, toUserIndexPattern} from './lib/to_user';
import {fromUser, fromUserIndexPattern} from './lib/from_user';
import {uiModules} from 'ui/modules';

uiModules
  .get('kibana')
  .directive('knqlParseQuery', function (Private) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        'ngModel': '='
      },
      link: function ($scope, elem, attr, ngModel, indexPattern) {
        let init = function () {
          $scope.ngModel = fromUser($scope.ngModel, ($scope ? $scope.$parent : undefined));
        };

        let fieldMap;

        if ($scope.$parent.indexPattern.nested) {
          attr.placeholder = 'Search.. (e.g. status=200 AND extension="PHP"';
        }

        if ($scope.$parent.indexPattern) {
          fieldMap = $scope.$parent.indexPattern.fields;
        }

        toUserIndexPattern(fieldMap);
        fromUserIndexPattern(fieldMap);
        ngModel.$parsers.push(fromUser);
        ngModel.$formatters.push(toUser);

        init();

      }
    };
  });
