/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai'),
    Treasure = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
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
      var obj = { name:'gold coin', photo:'img/gold-coin-india.jpg', location:{name:'Jaipur', lat: 26.8852107, lng: 75.7905578}, difficulty:'medium', hint:'It is beside the mystics house in a trench.'},
      t = new Treasure(obj);
      console.log(t);

      expect(t).to.be.instanceof(Treasure);
    });
  });

  describe('.all', function(){
    it('should get all the treasures', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should get a treasure by the id', function(done){
      var id = '000000000000000000000001';
      Treasure.findById(id, function(treasure){

        console.log(treasure);
        expect(treasure.name).to.equal('Mummy Hand');
        done();
      });
    });
  });

  //describe('.create', function(){
    //it('should create a new treasure', function(done){
      //var obj = { name:'gold coin', photo:'img/gold-coin-india.jpg', location:{name:'Jaipur', lat: 26.8852107, lng: 75.7905578}, difficulty:'medium', hint:'It is beside the mystics house in a trench.'},
      //Treasure.create(obj, function(treasure){
        //expect(tresure)
      //});
    //});
  //});

});//end
