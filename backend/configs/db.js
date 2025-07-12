import mongoose from "mongoose";

    const connectDB = async ()=>{
    try {
        if (mongoose.connections[0].readyState >=1) return;
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000,
        });
        console.log('database is connected!');
        
    } catch (error) {
        console.log(error.message);
    }   
};

export default connectDB;
