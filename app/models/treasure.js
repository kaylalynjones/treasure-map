'use strict';

var Mongo = require('mongodb');

function Treasure(obj){
  this.name = obj.name;
  this.photo = obj.photo;
  this.loc = {name:obj.name, lat:parseInt(obj.lat), lng:parseInt(obj.lng)}
  this.difficulty  = obj.difficulty;
  this.hint = obj.hint;
  this.found = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasure');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, function(err, treasure){
    cb(treasure);
  });
};

//Treasure.create = function(obj, cb){
  //treasure = new Treasure(obj);
  //Vacation.collection.save(treasure, function(){
    //cb(treasure);
  //});
//};


module.exports = Treasure;
