const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const bodyParser=require("body-parser");
const colors=require("colors");
const dotenv=require("dotenv");
const { listen } = require("express/lib/application");
const connectDB = require("./config/db");
const authRoutes=require('./routes/authRoutes');
const errorHandler = require("./middelwares/errorMiddleware");


dotenv.config();
connectDB();
const app=express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan("dev"));
app.use(errorHandler)
const PORT=process.env.PORT || 8080

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.listen(PORT,()=>{
    console.log(`server running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
})