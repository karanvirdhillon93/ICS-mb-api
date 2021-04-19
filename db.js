import mongoose from 'mongoose';
// connect to locally running MongoDB instance
//let dbURI = 'mongodb://10.21.75.61:27017';
let dbURI = 'mongodb://localhost:27017/msgs_db';

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


   // print message to console when connected to DB
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to ' + dbURI);
    });

// print error message to console
// if there is a problem connecting
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error:' + err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
 
    import '/home/student/ics221-mb-api/models/message-schema.js';
    import '/home/student/ics221-mb-api/models/user-schema.js';
    import '/home/student/ics221-mb-api/models/labs-schema.js';