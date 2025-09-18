import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { connect } from "mongoose";
import { connectDB } from "./config/db.js";

//imported rouutes
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(express.json());
app.use(cors({
  origin: [
    '*', 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


app.use('/api/auth', authRoutes);

app.get("/",  (req ,res) => {
    res.json({message:'Api Running'});
});

// Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5959;

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server Running on ${PORT}`)
})

