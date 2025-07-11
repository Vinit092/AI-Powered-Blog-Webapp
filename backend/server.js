import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/admin.routes.js';
import blogRouter from './routes/blog.routes.js';

const app=express();

// middlewares
app.use(cors());
app.use(express.json());

const PORT= process.env.PORT || 5002;

// routes
app.get('/',(req,res)=>res.send('server is working'));
app.use('/api/admin',adminRouter);
app.use('/api/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
    connectDB();
});
