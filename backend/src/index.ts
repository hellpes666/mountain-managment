import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(`server running at http://localhost:${PORT}`);
});
