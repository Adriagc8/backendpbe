const utils = {}
const date = new Date();

utils.toSQL = (table, query) => {
    var sqlQuery = 'SELECT * FROM ' + table ;
    var i = 0;
    for (elem in query) {
        console.log(query[elem]);
        var op = '='
        //mirar a cada iteracio si el nom te caracter especial "[lt]","[lte]","[gt]","[gte]"
        if (elem != "limit") {
            var parts = elem.split('['); //separar pel caracter[
            if (parts.length > 1) {
                if (parts[1] == "lt]") {
                    op = ' < ';
                } else if (parts[1] == "lte]") {
                    op = ' <= ';
                } else if (parts[1] == "gt]") {
                    op = ' > ';
                } else if (parts[1] == "gte]") {
                    op = ' >= ';
                }
            }

            if (i > 0) {
                if (query[elem] == "now") sqlQuery += " AND " + parts[0] + op + "CURDATE()";//date[gt]=now  in tasks
                else sqlQuery += " AND " + parts[0] + op +"'"+query[elem]+"'";

            } else {
                if (query[elem] == "now") sqlQuery += " WHERE " + parts[0] + op + "CURDATE()"; //date[gt]=now  in tasks
                else sqlQuery += ' WHERE '+ parts[0] + op +"'"+query[elem]+"'";
            }
            i++;
        }
    }

    return sqlQuery;

}



module.exports = utils;
