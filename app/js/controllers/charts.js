'use strict'

var controllersModule = require('./_index');
var _ = require('lazy.js');

/**
* @ngInject
*/
function ChartsCtrl($scope, $filter) {
  $scope.myInterval = 10000;

  var charts = [
    {
       type: 'chart-line',
       title: {
          bg: "Цени на петрола и газта 2015",
          en: "Gas and oil prices 2015"
       },
       labels: [{bg:"Януари",en:"January"}, {bg:"Февруари",en:"February"}, {bg:"Март",en:"March"}, {bg:"Април",en:"April"}, {bg:"Май",en:"May"}, {bg:"Юни",en:"June"}, {bg:"Юли",en:"July"}],
       series: [{bg:"Цена на Газта",en:'Price of Gas'}, {bg:"Цена на Петрола",en:'Price of Petrol'}],
       data: [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
       ],
       legend: false
    },
    {
       type: 'chart-pie',
       title: {
          bg: "Дял на възобновими източници в България",
          en: "Renewable energy sources share in Bulgaria"
       },
       labels: [{bg:"Вятър",en:'Wind'}, {bg:"ВЕЦ",en:'Water'}, {bg:"Слънчева", en:"Sun"}],
       data: [40, 40, 20],
       legend: true
    },
    {
       type: 'chart-bar',
       title: {
          bg: "Дял на енергията произведена от възобновими източници",
          en: "Energy generate from renewable sources share"
       },
       labels: [{bg:"България",en:"Bulgaria"}, {bg:"Сърбия",en:"Serbia"}, {bg:"ЕС",en:"EU"}],
       series: [{bg:"Вятър",en:'Wind'}, {bg:"ВЕЦ",en:'Water'}, {bg:"Слънчева", en:"Sun"}],
       data: [
         [40, 40, 20],
         [39, 39, 22],
         [20, 20, 60]
       ],
       legend: false
    }
  ]

  var translatedCharts = _(charts).map(function(chart){
    return {
        type: chart.type,
        title: $filter("lang")(chart.title),
        labels: $filter("lang")(chart.labels),
        series: $filter("lang")(chart.series),
        data: chart.data,
        legend: chart.legend
    }
  }).toArray();

  $scope.charts = translatedCharts;
}

controllersModule.controller('ChartsCtrl', ChartsCtrl);
