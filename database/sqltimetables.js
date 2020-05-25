var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '314159',
  database: 'database_pbe'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO timetables (day, hour,subject, room) VALUES ?";
  var values = [
    ['Mon', '08:00', 'Lab DSBM', 'C3S102'],
    ['Mon', '10:00', 'PSAVC', 'A4201'],
    ['Tue', '12:00', 'Lab RP', 'A4201'],
    ['Tue', '08:00', 'RP', 'A4105'],
    ['Tue', '10:00', 'TD', 'A4101'],
    ['Tue', '13:00', 'DSBM', 'A4201'],
    ['Wen', '08:00', 'Lab PBE', 'A4201'],
    ['Thu', '08:00', 'PBE', 'A4101'],
    ['Thu', '10:00', 'PSAVC', 'A4201'],
    ['Thu', '12:00', 'TD', 'A4101'],
    ['Fri', '08:00', 'DSBM','A4201'],
    ['Fri', '10:00', 'RP', 'A4105'],
    ['Fri', '12:00', 'PSAVC', 'A4201']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});