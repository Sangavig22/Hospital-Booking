import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected to host: ' + con.connection.host);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDatabase;