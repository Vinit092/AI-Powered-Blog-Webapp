import mongoose from "mongoose";

    const connectDB = async ()=>{
    try {
        if (mongoose.connections[0].readyState) return;
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('database is connected!');
        
    } catch (error) {
        console.log(error.message);
    }   
};

export default connectDB;
