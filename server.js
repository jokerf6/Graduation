import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import connection from "./util/connection.js";
import Responses from "./util/response.js";
import nodemailer from "nodemailer";
import SetupModels from "./models/setupmodels.js";

import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import APIRouter from "./routes/APIRouter.js"

dotenv.config();
const app = express();
const JwtStrategy = Strategy;
try {
	 connection.authenticate();
	 connection.sync();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(morgan("dev"));

app.use("/" , APIRouter)
app.use("/assets", express.static("assets"));
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
