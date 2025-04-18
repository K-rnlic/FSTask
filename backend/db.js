const mongoose = require('mongoose');
const mongoURI = "mongodb://nihon:nihon123*@10.126.249.166:8000/nihondb"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
};

module.exports = connectToMongo;