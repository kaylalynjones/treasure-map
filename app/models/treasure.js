'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(obj){
  console.log(obj);
  this.name = obj.name;
  this.photos = obj.photos || [];
  this.order =obj.order;
  this.loc = {name:obj.loc.name, lat:parseFloat(obj.loc.lat), lng:parseFloat(obj.loc.lng)};
  this.difficulty  = obj.difficulty;
  this.hint = obj.hint;
  this.found = false;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:id}, function(err, treasure){
    treasure = changePrototype(treasure);
    cb(treasure);
  });
};

Treasure.prototype.save = function(cb){
  var treasure = this;
  Treasure.collection.save(this, function(){
    cb(treasure);
  });
};

Treasure.prototype.toggleFound = function(){
  this.found = !this.found;
};

Treasure.prototype.uploadPhotos = function(files, cb){
  var dir = __dirname + '/../static/img/' + this._id,
  exist = fs.existsSync(dir),
  self = this;

  if(!exist){
    fs.mkdirSync(dir);
  }
  files.photos.forEach(function(photo){
    var ext = path.extname(photo.path),
        rel = '/img/' + self._id + '/' + self.photos.length + ext,
        abs = dir + '/' + self.photos.length + ext;
    fs.renameSync(photo.path, abs);
    self.photos.push(rel);
  });
  this.save(cb);
};

//private
function changePrototype(obj){
  var treasure = _.create(Treasure.prototype, obj);
  return treasure;
}

module.exports = Treasure;
