require('dotenv').config()
const express=require("express");
const cors=require("cors");
const authRoutes=require("./routes/auth");
const noteRoutes=require("./routes/note");
const client=require("./configs/db");
const { connect } = require("./routes/auth");
const app=express();

app.use(express.json());
app.use(cors());

const port=process.env.port || 8000;

 app.use('/auth',authRoutes);
 app.use('/note',noteRoutes);

 client.connect(()=>{
     console.log("connected to db");
 })
app.listen(port,()=>{
    console.log(`server is running on port = ${port}`);
})