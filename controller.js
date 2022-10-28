const pool = require('./db');
const queries = require('./queries');


const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) =>{
    if(error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [id], (error, results) =>{
      if(error) throw error;
      res.status(200).json(results.rows);
    });
  };

  const addUser = (req, res) => {
    const { name, email, dob, location, number, password, image }= req.body;
    pool.query(queries.addUser, [name, email, dob, location, number, password, image], (error, results) =>{
      if(error) throw error;
      res.status(201).send("user created successfully !");
    });
  };

  const removeUser = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User doesn't exist in the database");
        }

        pool.query(queries.removeUser, [id], (error, results) => {
            if(error) throw error;
                res.status(200).send("user removed successfully.");
            });
    });
  };
 
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, dob, location, number, password, image }= req.body;

    pool.query(queries.getUserById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User doesn't exist in the database");
        }


    pool.query(queries.updateUser, [name, email, dob, location, number, password, image, id], (error, results) => {
    if(error) throw error;
    res.status(200).send("user updated successfully");
    });
  });
};




module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,

};