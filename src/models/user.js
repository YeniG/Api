const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ejemplo'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection){
        connection.query('select * from usuario order by cedula', 
        (err, rows) => {
            if (err){
                throw err;
            }else{
                callback(null, rows);
            }

          }
        )
    }
};

userModel.insertUser = (userData, callback) => {
    if (connection){
        connection.query('insert into usuario set ?', userData,
        (err, rows)=> {
            if (err){
                throw err;
            }else{
                callback(null,rows);
            }
        })
    }
};

userModel.updateUser = (userData, callback)=>{
    if(connection){
    const sql = `
    update usuario set 
    nombre = ${connection.escape(userData.nombre)},
    apellido = ${connection.escape(userData.apellido)}
    where cedula = ${connection.escape(userData.cedula)}
    `
    connection.query(sql, (err, result)=>{
        if (err){
            throw err;
        }else{
            callback(null, {
                "msg":"Usuario actualizado"
            });
        }
    })

    }


};

userModel.deleteUser = (id, callback)=>{
    if(connection){
        User.deleteUser =(userData, callback) =>{
            if(connection){

                const sql = `
                select * from usuario where id = ${connection.escape(id)}`;

                connection.query(sql, (err, data)=>{
                    if (data){
                        let sql = `delete from usuario where id = ${id}`;
                        connection.query(sql, (err, data)=>{
                            if (err){
                                throw err;
                            }else{
                                callback(null, {
                                    "msg": "Usuario eliminado"
                                })
                            }

                        })
                        
                    }else{
                        callback(null, {
                            "msg": "No existe este usuario"
                        })
                        

                    }

                })

            }
        }

    }
};

module.exports = userModel;