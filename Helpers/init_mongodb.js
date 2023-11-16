const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log('mongodb connected');
}).catch(err => console.error(err.message));

mongoose.connection.on('connected', () => {
    console.log('db connected');
});

mongoose.connection.on('error', (err) => {
    console.error(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('db disconnected');
});

process.on('SIGINT', async() => {
    await mongoose.connection.close();
    process.exit(0);
});