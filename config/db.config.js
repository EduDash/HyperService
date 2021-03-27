const mongoose = require('mongoose');

exports.dbConnect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });
  console.log(`[Hyper] Connected to MONGO @ ${conn.connection.host}`);
};
