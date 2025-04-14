import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { DbConnect } from "./lib";
import { climbersRouter } from "./routes/climbers.route";
import { mountainsRouter } from "./routes/mountains.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/climbers", climbersRouter);
app.use("/api/mountains", mountainsRouter);


app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
	DbConnect();
});
