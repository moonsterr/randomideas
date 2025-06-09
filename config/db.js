const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log('mongodb connection failed', error);
    process.exit();
  }
};

module.exports = connectDb;
