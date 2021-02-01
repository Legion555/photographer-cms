const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    () => console.log("Connected to DB")
)

//import route
const usersRoute = require('./routes/users');
const albumsRoute = require('./routes/albums');
const imagesRoute = require('./routes/images');

//Middleware
app.use(express.json());
app.use(cors());

//Route middleware
app.use('/api/users', usersRoute);
app.use('/api/albums', albumsRoute);
app.use('/api/images', imagesRoute);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log("Server is running"));