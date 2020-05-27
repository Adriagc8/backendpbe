var mysql = require('mysql');

var con=mysql.createConnection(database);

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO marks (subject, name, mark,student) VALUES ?";
    var values = [

        ['DSBM', 'control teoria', '7.5', 'Marc Bosch'],
        ['PBE', 'entrega final', '8', 'Marc Bosch'],
        ['PBE', 'CDR', '9.8', 'Marc Bosch'],
        ['PBE', 'examen final', '10', 'Marc Bosch'],
        ['PSAVC', 'parcial', '7', 'Marc Bosch'],
        ['RP', 'control 5', '4.9', 'Marc Bosch'],
        ['TD', 'parcial', '2', 'Marc Bosch'],

        ['DSBM', 'control teoria', '5.7', 'Adria Gonzalez'],
        ['PBE', 'entrega final', '8.5', 'Adria Gonzalez'],
        ['PBE', 'CDR', '9', 'Adria Gonzalez'],
        ['PBE', 'examen final', '9', 'Adria Gonzalez'],
        ['PSAVC', 'parcial', '7', 'Adria Gonzalez'],
        ['RP', 'control 5', '9.4', 'Adria Gonzalez'],
        ['TD', 'parcial', '2', 'Adria Gonzalez'],

        ['DSBM', 'control teoria', '5', 'Victor Barbera'],
        ['PBE', 'entrega final', '9.5', 'Victor Barbera'],
        ['PBE', 'CDR', '9.8', 'Victor Barbera'],
        ['PBE', 'examen final', '4.9', 'Victor Barbera'],
        ['PSAVC', 'parcial', '8', 'Victor Barbera'],
        ['RP', 'control 5', '1', 'Victor Barbera'],
        ['TD', 'parcial', '6.9', 'Victor Barbera'],

        ['DSBM', 'control teoria', '3.4', 'Guifre Sala'],
        ['PBE', 'entrega final', '6', 'Guifre Sala'],
        ['PBE', 'CDR', '8.3', 'Guifre Sala'],
        ['PBE', 'examen final', '7.4', 'Guifre Sala'],
        ['PSAVC', 'parcial', '8.3', 'Guifre Sala'],
        ['RP', 'control 5', '1', 'Guifre Sala'],
        ['TD', 'parcial', '8.6', 'Guifre Sala'],

        ['DSBM', 'control teoria', '1', 'Marina Miro'],
        ['PBE', 'entrega final', '7.8', 'Marina Miro'],
        ['PBE', 'CDR', '5.1', 'Marina Miro'],
        ['PBE', 'examen final', '8.4', 'Marina Miro'],
        ['PSAVC', 'parcial', '6.1', 'Marina Miro'],
        ['RP', 'control 5', '4', 'Marina Miro'],
        ['TD', 'parcial', '5.2', 'Marina Miro'],

        ['AST', 'control teoria', '7.5', 'Francesc Oller'],
        ['AST', 'entrega final', '1', 'Francesc Oller'],
        ['PBE', 'CDR', '9.8', 'Francesc Oller'],
        ['PBE', 'examen final', '4', 'Francesc Oller'],
        ['PBE', 'parcial', '7.3', 'Francesc Oller'],
        ['RP', 'control 5', '7', 'Francesc Oller'],
        ['TD', 'parcial', '8', 'Francesc Oller'],

        ['AST', 'control teoria', '1', 'Josep Cotrina'],
        ['AST', 'entrega final', '1', 'Josep Cotrina'],
        ['PBE', 'CDR', '9.8', 'Josep Cotrina'],
        ['PBE', 'examen final', '4', 'Josep Cotrina'],
        ['PBE', 'parcial', '1', 'Josep Cotrina'],
        ['RP', 'control 5', '5.4', 'Josep Cotrina'],
        ['TD', 'parcial', '5.1', 'Josep Cotrina']
    ];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});
