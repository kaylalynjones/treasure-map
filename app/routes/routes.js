'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    home           = require('../controllers/home'),
    treasure       = require('../controllers/treasure');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);
  app.get('/about', home.about);
  app.get('/contact', home.contact);
  app.get('/faq', home.faq);

  app.get('/treasures/new', treasure.init);
  app.post('/treasures/new', treasure.create);
  app.get('/treasures', treasure.index);
  app.get('/treasures/:id', treasure.show);
  app.post('/treasures/:id', treasure.toggleFound);

  console.log('Express: Routes Loaded');
};

