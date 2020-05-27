const url = require('url');
const pool = require('../database/database');
const { toSQL } = require('../lib/utils');
let student;

exports.timetables = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = [];
    let temporal = [];

    const date = new Date();
    let n_day = date.getDay(); // (1=Mon,2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 0=Sun)
    let day;
    let pos = 0;
    //crida a la funcio que crea la sentencia de mysql segons la demanda del client
    const SQL = toSQL("timetables", query);
    // Consulta a la taula
    let result = await pool.query(SQL);
    let l = result.length;
    if (n_day == 6 || n_day == 0 || SQL != "SELECT * FROM timetables") { //si es disabte, diumenge o be a la query ens ha passat una data en concret no reordenem
      temporal=result;

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
       if (pos == result.length) { // Si el dia seguent es el Monday no reordenem
           temporal = result;
       } else {                    //reordenem desde pos fins a pos-1
           let j = 0;
           for (let i = pos; i != (result.length+1); i = (i + 1) % result.length) {
               temporal[j] = result[i];//[result[i].day, result[i].hour, result[i].subject, result[i].room];
               j++;
               if(i==pos-1) break
           }
       }

   }
   if (limit && result.length > query.limit) { // si el client ens ha indicat un limit, de l'objecte temporal agafem el nombre del columnes demanades
            l = query.limit; // en el cas de que el limit sigui mes gran que les columnes obtingudes
       }
   for (let k = 0; k < l; k++) {
       resposta[k] = [temporal[k].day, temporal[k].hour, temporal[k].subject, temporal[k].room];
   }

     let send = {"tableName" : "timetables", "rows" : resposta,"message":"success"};
     console.log(send);
     res.writeHead(200, {'Content-Type': 'application/json'});
     res.end(JSON.stringify(send));


};
exports.tasks = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = [];
    //crida a la funcio que crea la sentencia de mysql segons la demanda del client
    const SQL = toSQL("tasks", query);
    // Consulta a la taula
    let result = await pool.query(SQL);
    let l=result.length;
    if (limit && result.length > query.limit) { // si el client ens ha indicat un limit, de l'objecte temporal agafem el nombre del columnes demanades
             l = query.limit; // en el cas de que el limit sigui mes gran que les columnes obtingudes
    }
    for (let k = 0; k < l; k++) {
        resposta[k] = [result[k].date,result[k].subject, result[k].name];
    }
    let send = {"tableName" : "tasks", "rows" : resposta,"message":"success"};

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(send));
};

exports.marks = async (req, res) => {

    const reqUrl = url.parse(req.url, true);
    const query = reqUrl.query;
    const limit = query.limit;
    let resposta = [];
    let SQL = toSQL("marks", query);

    if(SQL=="SELECT * FROM marks"){
        SQL+=" WHERE student="+"'"+student+"'";
        console.log(SQL);
    }else{
        SQL+= " AND student=" +"'"+ student+"'";
    }
    let result = await pool.query(SQL);
    let l=result.length;
    if (limit && result.length > query.limit) { // si el client ens ha indicat un limit, de l'objecte temporal agafem el nombre del columnes demanades
             l = query.limit; // en el cas de que el limit sigui mes gran que les columnes obtingudes
    }
    for (let k = 0; k < l; k++) {
        resposta[k] = [result[k].subject, result[k].name,result[k].mark];
    }

    let send = {"tableName" : "marks", "rows" : resposta,"message":"success"};
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(send));
};

exports.login = async (req, res) => {
  const reqUrl = url.parse(req.url, true);
  const query = reqUrl.query;

  //crida a la funcio que crea la sentencia de mysql segons la demanda del client
  const SQL = toSQL("students", query);
  // Consulta a la taula
  let result = await pool.query(SQL);

  if(result.length>0) student=result[0].name;
  else student=null;

  const resposta={
    name:student
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resposta));
};

exports.logout = async (req, res) => {
  student=null;
  const resposta={
    message: "logout"
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resposta));

};

exports.invalidRequest = (req, res) => {
    const invalid = { message: "Sintaxi incorrecta" };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(invalid));

};
