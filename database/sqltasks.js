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
    var sql = "INSERT INTO tasks (date,subject, name) VALUES ?";
    var values = [
        ['2020-05-24', 'PBE teoria', 'Annexo 3'],
        ['2020-05-26', 'PSAVC', 'Pràctica 3'],
        ['2020-05-27', 'PBE', 'Critical Design Report'],
        ['2020-05-27', 'PBE', 'Final Report'],
        ['2020-05-27', 'PBE', 'Requirement Specification'],
        ['2020-05-27', 'PBE', 'Project Plan'],
        ['2020-05-27', 'PBE', 'Video'],
        ['2020-05-27', 'DSBM', 'MicroTasca 7'],
        ['2020-05-30', 'RP', 'Control 5'],
        ['2020-06-03', 'PSAVC', 'EXAMEN FINAL'],
        ['2020-06-05', 'PBE', 'EXAMEN FINAL'],
        ['2020-06-09', 'RP', 'EXAMEN FINAL'],
        ['2020-06-15', 'DSBM', 'EXAMEN FINAL'],
        ['2020-06-18', 'TD', 'EXAMEN FINAL']
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});