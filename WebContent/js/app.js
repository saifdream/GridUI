var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping']);

app.controller('MainCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
 function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {

  $scope.gridOptions = {};
  $scope.gridOptions.data = 'myData';
  $scope.gridOptions.enableColumnResizing = true;
  $scope.gridOptions.enableFiltering = true;
  $scope.gridOptions.enableGridMenu = true;
  $scope.gridOptions.showGridFooter = true;
  $scope.gridOptions.showColumnFooter = true;
  $scope.gridOptions.fastWatch = true;

  $scope.gridOptions.rowIdentity = function(row) {
    return row.id;
  };
  $scope.gridOptions.getRowIdentity = function(row) {
    return row.id;
  };

  $scope.gridOptions.columnDefs = [
    { name:'id', width:60 },
    { name:'name', width:150 },
    { name:'age', width:80, enableCellEdit: true, aggregationType:uiGridConstants.aggregationTypes.avg, treeAggregationType: uiGridGroupingConstants.aggregation.AVG },
    { name:'address.street', width:150, enableCellEdit: true },
    { name:'address.city', width:150, enableCellEdit: true },
    { name:'address.state', width:150, enableCellEdit: true },
    { name:'address.zip', width:150, enableCellEdit: true },
    { name:'company', width:110, enableCellEdit: true },
    { name:'email', width:100, enableCellEdit: true },
    { name:'phone', width:140, enableCellEdit: true },
    { name:'about', width:200, enableCellEdit: true },
    { name:'friends[0].name', displayName:'1st friend', width:150, enableCellEdit: true },
    { name:'friends[1].name', displayName:'2nd friend', width:150, enableCellEdit: true },
    { name:'friends[2].name', displayName:'3rd friend', width:150, enableCellEdit: true },
    { name:'agetemplate',field:'age', width:100, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' },
    { name:'Is Active',field:'isActive', width:150, type:'boolean' }
  ];

  $scope.callsPending = 0;

  var i = 0;
  $scope.refreshData = function(){
    $scope.myData = [];

    var start = new Date();
    var sec = $interval(function () {
      $scope.callsPending++;

      $http.get('angular-ui/ui-grid.info/gh-pages/data/500_simple.json')
        .success(function(data) {
          $scope.callsPending--;

          data.forEach(function(row){
            row.id = i;
            i++;
            $scope.myData.push(row);
          });
        })
        .error(function() {
          $scope.callsPending--
        });
    }, 200);


    $timeout(function() {
       $interval.cancel(sec);
       $scope.left = '';
    }, 2000);

  };
  
  $scope.refreshData();

}]);
