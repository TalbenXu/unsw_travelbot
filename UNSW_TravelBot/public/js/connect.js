var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "baobeiwoai0Z"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("INSERT INTO `travelbot`.`User` (`username`, `emal`, `password`) VALUES ('3', 'dmmu', 'd1d');", function (err, result) {
      if (err) throw err;
      console.log("Result: " + JSON.stringify(result));
    });
});