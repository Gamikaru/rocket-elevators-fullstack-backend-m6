const mongoose = require('mongoose');
require('dotenv').config();

const openMongoConnection = () => {
    mongoose.set('strictQuery', true);

    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("MongoDB connection error:", error);
        });
};

module.exports = { openMongoConnection };
