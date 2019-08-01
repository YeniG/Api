const User = require('../models/user');

module.exports = function (app) {

    app.get('/usuario', (req, res) => {
      User.getUsers((err, data)=>{
          res.json(data);
      });
    });

    app.post('/usuario', (req, res)=>{
       const userData = {
         cedula: req.body.cedula,
         nombre: req.body.nombre,
         apellido: req.body.apellido
        };

        User.insertUser(userData, (err, data) =>{
          if(data){
            res.status(200).json({
              success: true,
              msg: 'Usuario insertado'+ ' ' +req.body.cedula,
              
             })
          }else{
            res.status(400);
          }
        }) 
    });

    app.put('/usuario/:cedula', (req, res)=>{

      const userData = {
        cedula: req.params.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido
       };

      User.updateUser(userData, (err, data) =>{
        if(data){
          res.json(data);

        }else{
          res.json({
            success: false,
            msg: 'error'
          })
          
        }
      })
    });

    app.delete('/usuario/:cedula', (req, res)=>{

      User.deleteUser(req.params.cedula, (err, data) => {
        if(data){
          res.json(data);
        }else{
          res,json({
            success: false,
            msg: 'error'
          })
        }
      })

    });

    
}