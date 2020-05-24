const url = require('url');
const pool = require('../database/database');
const { toSQL } = require('../lib/utils');


exports.timetables = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = {};
    let temporal = {};
    const date = new Date();
    let n_day = date.getDay(); // (1=Mon,2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 0=Sun)
    let day;
    let pos = 0;
    //crida a la funcio que crea la sentencia de mysql segons la demanda del client
    const SQL = toSQL("timetables", query);
    // Consulta a la taula
    let result = await pool.query(SQL);
    console.log(result);
    console.log(result[0]);


        if (n_day == 6 || n_day == 0 || SQL != "SELECT * FROM timetables") { //si es disabte, diumenge o be la query ens ha passat una data en concret no reordenem 
            temporal = result;
        } else {
            for (pos; pos < result.length; pos++) {

                if (result[pos].day == "Mon") day = 1;
                else if (result[pos].day == "Tue") day = 2;
                else if (result[pos].day == "Wed") day = 3;
                else if (result[pos].day == "Thu") day = 4;
                else if (result[pos].day == "Fri") day = 5;
                var hora = result[pos].hour.split(':');    // Agafem les hores(HH) de la hora (HH:MM)
                var a_hora = date.getHours();       // Obtenim la hora actuar (H)
               
                if (day == n_day && hora[0] >= a_hora) break; //si es el dia i la hora de la clase es mes gran o igual al actual sortim
                else if (day > n_day) break; // No hem tobat hora mes gran que la actual, reordena desde el dia seguent
            }
            if (pos == result.length) { // Si el dia seguent es el Mon no reordenem
                temporal = result;
            } else {                    //reordenem desde pos fins a pos-1
                let j = 0;
                for (let i = pos; i != (pos - 1); i = (i + 1) % result.length) { 
                    temporal[j] = result[i];
                    j++;
                }
            }

        }
        

    if (limit) { // si el client ens ha indicat un limit, de l'objecte temporal agafem el nombre del columnes demanades
        var l;
        if (result.length < query.limit) l = result.length; // en el cas de que el limit sigui mes gran que les columnes obtingudes
        else l = query.limit;

        for (let k = 0; k < l; k++) {
            resposta[k] = temporal[k];

        }
       
    }else{
        resposta=temporal;
    }
     //console.log(resposta);
     let formattedResponse = {"tableName" : "timetables", "rows" : resposta};
     console.log(formattedResponse);

     //res.send(resposta);


};
exports.tasks = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = {};
    //crida a la funcio que crea la sentencia de mysql segons la demanda del client
    const SQL = toSQL("tasks", query);
    // Consulta a la taula
    let result = await pool.query(SQL);

    //si ens demanen un limit de tasks
    if (limit) {
        let l;
        if (result.length < query.limit) l = result.length;
        else l = query.limit;

        for (let k = 0; k < l; k++) {
            resposta[k] = result[k];
        }
        
    } else {
        resposta = result;
        
    }
    // console.log(resposta);
     //res.send(resposta);

}

exports.marks = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = {};

    const SQL = toSQL("marks", query);
    /*
    if(SQL=="SELECT * FROM marks"){
        SQL+="WHERE student= "+ sessionManager.getUserID(socket.id);
    }else{
        SQL+= "AND student= " + sessionManager.getUserID(socket.id);
    }
    */
    let result = await pool.query(SQL);

    //si ens demanen un limit de marks
    if (query.limit) {
        let l;
        if (result.length < query.limit) l = result.length;
        else l = query.limit;

        for (let k = 0; k < l; k++) {
            resposta[k] = result[k];

        }
        console.log(resposta);
    } else {
        resposta = result;
        console.log(resposta);
    }
    // console.log(resposta);
     //res.send(resposta);

};

exports.invalidRequest = (req, res) => {
    let invalid = { message: "Sintaxi incorrecta" };
    res.send(invalid);
};
