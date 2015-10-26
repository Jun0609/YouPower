angular.module('civis.youpower')

.factory('Cooperatives', function($resource, $http, Config) {
  var result = $resource(Config.host + '/api/cooperative/:id', {id:'@_id'},{
    update: {
      method: 'PUT'
    },
    addAction: {
      method: 'POST',
      url: Config.host + '/api/cooperative/:id/action'
    },
    updateAction: {
      method: 'PUT',
      url: Config.host + '/api/cooperative/:id/action/:actionId'
    },
    deleteAction: {
      method: 'DELETE',
      url: Config.host + '/api/cooperative/:id/action/:actionId'
    },
    commentAction: {
      method: 'POST',
      url: Config.host + '/api/cooperative/:id/action/:actionId/comment'
    },
    getMoreComments: {
      method: 'GET',
      isArray: true,
      url: Config.host + '/api/cooperative/:id/action/:actionId/comment'
    },
    deleteActionComment: {
      method: 'DELETE',
      url: Config.host + '/api/cooperative/:id/action/:actionId/comment/:commentId'
    }
  });

  result.prototype.getEnergyData = function(type, granularity, period){
    var meterId = this.meters[type];
    return $http.get("https://app.energimolnet.se/api/2.0/consumptions/" +
      meterId + "/" +
      granularity + "/" +
      period + "?metrics=energy",{
        cached:true,
        headers:{
          'Authorization':'OAuth a4f4e751401477d5e3f1c68805298aef9807c0eae1b31db1009e2ee90c6e'
        }

      })
  };

  result.VentilationTypes = ["FTX (mekanisk från- och tilluft med återvinning)","FVP (frånluftsvärmepump)","F(mekanisk frånluftsventilation)","FT (mekanisk från- och tilluftsventilation)","S (självdragsventilation)","Vet ej","Övrig"]

  result.getActionTypes = function(){
    var actions = [{
      id: 100,
      name: "Heating and hot water"
    },{
      id: 101,
      name: "Control and optimisation",
      parent: 100
    },{
      id: 102,
      name: "Hot water",
      parent: 100
    },{
      id: 103,
      name: "Radiator system",
      parent: 100
    },{
      id: 104,
      name: "Ventilation",
      parent: 100
    },{
      id: 105,
      name: "Sub metering",
      parent: 100
    },{
      id: 106,
      name: "Household actions",
      parent: 100
    },{
      id: 200,
      name: "Electricity"
    },{
      id: 201,
      name: "Outdoor/roof heating",
      parent: 200
    },{
      id: 202,
      name: "Lighting",
      parent: 200
    },{
      id: 203,
      name: "Laundry room",
      parent: 200
    },{
      id: 204,
      name: "PV panels",
      parent: 200
    },{
      id: 205,
      name: "Sub metering",
      parent: 200
    },{
      id: 206,
      name: "Household actions",
      parent: 200
    }];
    actions.getById = function(id) {
      return _.findWhere(this,{id:id});
    }
    return actions;
  };

  return result;
});
