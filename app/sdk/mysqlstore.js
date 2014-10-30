var klass = require('klass')
  , mysql = require('mysql');

var MySqlStore = module.exports = klass(function () {

  // constructor
}).methods({

  callFunction : function(functionName, parameters, done) {

    this.runQuery(" Select "+functionName+" ("+ parameters +")", function(err,results) {
      var sanitized = results;
      if(err) {
        console.log('query failed');
        console.dir(err);
      }
      else {
        sanitized = results[0]
        var resultPropName = '';
        for(var prop in sanitized) {
           resultPropName = prop;
         }

        sanitized = sanitized[resultPropName];
      }

      done(err, sanitized);
    });
  },

  callStoredProcedure : function(procedureName, done) {
    this.runQuery(" call "+procedureName, function(err,results) {

        var sanitized = results;
        if(err) {
          console.log('query failed');
          console.dir(err);
        }
        else {
          sanitized = results[0]
        }

        done(err, sanitized);
    });
  },

  runQuery : function(queryText, done) {
    console.log(queryText);
    var conn = this.connection();
    conn.query(queryText, function(err,result) {

      done(err, result);
      conn.end();
    });
  },

  connection : function() {
    var credentials = this.getCredentials();
    console.log(credentials);
    var connection =  mysql.createConnection(credentials);
    return connection;
  },

  getCredentials : function () {

    if(process.env.STACKATO_SERVICES) {
      var connection = JSON.parse(process.env.STACKATO_SERVICES);
      var dbConnection =  connection['hpcloudrecruiting-db'];
      return {
        host: dbConnection.host,
        port : dbConnection.port,
        user : dbConnection.user,
        password : dbConnection.password,
        database : dbConnection.name
      }
    }
    else {
      return {
        host : 'localhost',
        port : 3306,
<<<<<<< Updated upstream
        user : 'cisystem',
        password: 'fairgate',
        database : 'hpcloudrecruiting'
=======
        user : 'tracker',
        password: 'password',
        database : 'helionize'
>>>>>>> Stashed changes
      };
    }
  }
});
