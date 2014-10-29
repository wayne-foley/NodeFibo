var PORT = (process.env.VMC_APP_PORT || 3000)
  , HOST = (process.env.VCAP_APP_HOST || 'localhost');

var fs = require('fs')
  , express = require('express')
  , app = express.createServer()
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , session = require('express-session');

// Config
app.set('views', __dirname + '/app/views');
app.register('.html', require('ejs'));
app.set('view engine', 'html');

app.configure(function(){
  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
  app.use(express.bodyParser());
  app.use(session({ secret: 'HPSECRET' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    return done(null, {});
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Resources
function bootResources(app) {
  fs.readdir(__dirname + '/app/resource', function (err, files){
    if (err) { throw err; }
    files.forEach(function (file){
      if ((file.indexOf("~") > -1) || (file.indexOf(".svn") > -1)) {
        return;
      }

      var name = file.replace('.js', '')
        , Res = require('./app/resource/' + name);

      if (typeof Res !== 'function') {
        return; // since this isn't a resource
      }

      if (typeof Res.prototype.route !== 'function') {
        return; // since this isn't a resource
      }

      var r = new Res();
      r.route(app);
    });
  });
}
bootResources(app);

if (!module.parent) {
  app.listen(PORT);
  console.log('App started on port: ' + PORT);
}

module.exports = app;
