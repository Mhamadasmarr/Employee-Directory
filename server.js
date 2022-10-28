const express = require("express");
const userRoutes = require('./routes');
const cors = require('cors');

const app = express();



app.use(express.json());
app.use(cors());

app.get("/", function(re,res){
    res.send("express here!")
});

app.use('/api/v1/users', userRoutes);

app.listen(3003, function(){ console.log("express server is running on port 3003"); });