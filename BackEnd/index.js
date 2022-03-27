const express = require('express');
const dotenv = require ('dotenv').config();
const cors = require('cors');


const userRoute = require ('./routes/UserRoutes');
const authRoute = require ('./routes/AuthRoutes');
const bucketRoute = require ('./routes/bucketRoutes');
const tripRoute = require ('./routes/tripRoutes');
const connectDB = require ('./config/connectDB');
const app = express();
app.use(cors());

//connect to DB
connectDB();

app.use(express.json());

app.use('/api/buckets',bucketRoute);
app.use('/api/trips',tripRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

const PORT = process.env.PORT | 8000;
app.listen(PORT, ()=>{
    console.log('server started');
}
);