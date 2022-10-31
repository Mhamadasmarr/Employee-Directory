const express = require("express");
const userRoutes = require('./routes');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();



app.use(express.json());
app.use(cors());

app.get("/", function(re,res){
    res.send("express here!")
});

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../Employee Directory/frontend/public', 'uploads'),
    filename: function (req, file, cb) {   
        cb(null, file.originalname )  
    }
})


app.post('/imageupload', async (req, res) => {	
    try {

        let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            
        }); 

    }catch (err) {console.log(err)}
})

app.use('/api/v1/users', userRoutes);

app.listen(3003, function(){ console.log("express server is running on port 3003"); });