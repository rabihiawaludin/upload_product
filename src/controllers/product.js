var connection = require('../../config/db');
var moment = require('moment');
const uploadFile = require("../middleware/upload")
var path = __dirname + "/"

function Product(){

    //post function
    this.create = async function(req, res) {

        await uploadFile(req, res)
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        var data = {
            product_name : req.body.product_name,
            product_category : req.body.product_category,
            product_description: req.body.product_description,
            price: req.body.price,
            image_path: req.file.destination,
            created_at : moment().format("YYYY-MM-DD HH:m:s")
          }

        connection.acquire(function(err, con) {
            con.query('insert into product set ?', data, function(err, result) {
              con.release();
              if (err) {
                res.send(500, {status: 500, message: err});
                console.log(err);
              } else {
                res.status(201).send({
                    message:"Success Upload!", 
                    results:data
                })
              }
            });
        });

    };

}

module.exports = new Product();
