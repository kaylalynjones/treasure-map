/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect,
    Treasure = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo = require('mongodb'),
    cp = require('child_process'),
    db = ('treasure-test');

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new treasure', function(){
      var obj = {name:'gold coin', photos:['img/gold-coin-india.jpg'], order: 1, loc:{name:'Jaipur', lat: '26.8852107', lng: '75.7905578'}, difficulty:'manageable', hint:'It is beside the mystics house in a trench.'},
      t = new Treasure(obj);
      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.all', function(){
    it('should get all the treasures', function(done){
      Treasure.all(function(err, treasures){
        console.log(treasures);
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should get a treasure by the id', function(done){
      var id = '000000000000000000000001';
      Treasure.findById(id, function(treasure){
        expect(treasure.name).to.equal('Mummy Hand');
        done();
      });
    });
  });

  describe('#save', function(){
    it('should save a treasure', function(done){
      var obj = {name:'Gold Coin', photos:['img/gold-coin-india.jpg'], order: 2, loc:{name:'Jaipur', lat: '26.8852107', lng: '75.7905578'}, difficulty:'manageable', hint:'It is beside the mystics house in a trench.'},
      t = new Treasure(obj);
      t.save(function(treasure){
        expect(treasure._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('#toggleFound', function(){
    it('should toggle the Found attribute', function(done){
      var id = '000000000000000000000001';
      Treasure.findById(id, function(treasure){
        treasure.toggleFound();
        expect(treasure.found).to.be.true;
        done();
      });
    });
  });

});//end
