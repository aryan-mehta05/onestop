import "dotenv/config";

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import session from "express-session";

import PostsRoutes from "./onestop/posts/routes.js";
import UserRoutes from "./onestop/users/routes.js";
import FlightInspirationRoutes from "./onestop/flightInspiration/routes.js";
import FriendsRoutes from "./onestop/friends/routes.js"

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
const app = express();

dotenv.config();

mongoose.connect(CONNECTION_STRING);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000"
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "xr7kHlX6IX6HQHI",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);

PostsRoutes(app);
UserRoutes(app);
FlightInspirationRoutes(app);
FriendsRoutes(app);

app.listen(process.env.PORT || 4000);
