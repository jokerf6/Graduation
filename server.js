import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import connection from "./util/connection.js";
import Responses from "./util/response.js";
import nodemailer from "nodemailer";

import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

dotenv.config();
const app = express();
const JwtStrategy = Strategy;
try {
	 SetupModels(connection);
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


app.listen(3000, () => {
	console.log(`Server is running on port ${3000}`);
});
