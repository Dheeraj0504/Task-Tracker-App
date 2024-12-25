const mongoose = require('mongoose');


function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected to the database');
    }).catch((err) => {
        console.error(`Failed to connect to the database: ${err.message}`);
    });
}
module.exports = connectToDb;