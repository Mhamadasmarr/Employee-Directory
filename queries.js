const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const addUser = "INSERT INTO users (name, email, dob, location, number, password, image) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeUser = "DELETE FROM users WHERE id= $1";
const updateUser = "UPDATE users SET name = $1, email = $2, dob = $3, location = $4, number = $5, password = $6, image = $7 WHERE id = $8";

module.exports = {
    getUsers,
    getUserById,
    addUser,
    removeUser,
    updateUser,

};