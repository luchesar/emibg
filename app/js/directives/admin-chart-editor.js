'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function emiChartEditor($compile) {
  return {
    restrict: 'E',
    templateUrl: 'admin/chart-grid.html',
    link: function(scope, element, attributes) {
      var chartObjStr = element.attr('chart') || "chart";
      var chartObj = scope.$eval(chartObjStr);

      var toGridDataSeries = function(labels, data, series) {
        var line1 = ["", ""].concat(labels).reduce(
          (obj, label, index) => {
            obj['column' + index] = (label === "" ? "" : label.bg)
            return obj
          }, {}
        );
        var line2 = ["", ""].concat(labels).reduce(
          (obj, label, index) => {
            obj['column' + index] = (label === "" ? "" : label.en)
            return obj;
          }, {}
        );
        var gridData = [line1, line2];
        series.forEach((element, index) => {
          var row = {"column0": element.bg, "column1": element.en};
          data[index].forEach((d,i) => row["column" + (2 + i)] = d);
          gridData.push(row);
        });
        return gridData;
      };

      var objectToArray = function(p) {
        var result = [];
        for (var key in p) {
          if (p.hasOwnProperty(key)) {
            result.push(p[key]);
          }
        }
      };

      var fromGridDataSeries = function(gridData) {
        var labelsBg = objectToArray(gridData[0]).slice(2);
        var labelsEn = objectToArray(gridData[0]).slice(2);

        var labels = labelsBg.map((l,i) => ({bg: l, en: labelsEn[i]}));
        var data = gridData.filter((o,i) => i > 1).map(objectToArray).map(array => array.slise(2));
        var series = gridData.filter((o,i) => i > 1).map(o => ({bg: o.column0, en: o.column1}));
        
        return {labels: labels, ata: data, series: series};
      }

      var listener = function() {
        var chartObj = scope.$eval(chartObjStr);
        if (chartObj) {
          var labels = chartObj.labels;
          var data = chartObj.data;
          var series = chartObj.series;
          scope.gridOptions = {
            data: 'gridData',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
              {field: 'name', displayName: 'Name', enableCellEdit: true},
              {field:'age', displayName:'Age', enableCellEdit: true}
            ]
          };

          scope.gridData = toGridDataSeries(labels, data, series);
         /* scope.$watchCollection("gridData", function() {
            var newGridData = gromGridDataSeries(scope.gridData);
            chartObj.labels = newGridData.labels;
            chartObj.data = newGridData.data;
            chartObj.series = newGridData.series;
          });*/

          $compile(element.contents())(scope);
        }
      };
      if (chartObj) scope.$watchCollection(chartObj, listener)
      else scope.$watchCollection(chartObjStr, listener);
    }
  };
}

directivesModule.directive('emiChartEditor', emiChartEditor);
