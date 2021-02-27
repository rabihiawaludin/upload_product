var mysql = require("mysql");

function Connection(){
    
    this.pool = null;

    var connect = {
        host        : 'localhost',
        user        : 'root',
        password    : '',
        database    : 'product'
    }

    this.init = function(){
        this.pool = mysql.createPool(connect);
    }

    this.acquire = function(callback){
        this.pool.getConnection(function(err, connection){
            callback(err, connection);
        });
    };
}

module.exports = new Connection();
