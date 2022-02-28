import {} from "dotenv/config";
import express from "express";
import { Admin, default as mongodb } from "mongodb";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import {admin} from "./routes/admin.js";
import {data} from "./routes/covidData.js";

const app = express();
const port = process.env.PORT || 8888;

const uri =
  "mongodb+srv://bancovtarlac:bancovtarlac@cluster0.olpi2.mongodb.net/bancovTarlac?retryWrites=true&w=majority";
// Database name
const dbName = "bancovTarlac";

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../Client/build')));

app.use(cookieParser()); //for using cookies
app.use(express.json()); //allow body parsing
app.use(express.text()); //allow text reading
app.use(express.urlencoded({ extended: true }));

let MongoClient = mongodb.MongoClient;

MongoClient.connect(uri) //connect to the database
.then(async client =>{
    const db = client.db(dbName);

    const admins = await db.collection("admin");
    const covidData = await db.collection("covidData");

    app.locals.admins = admins; //store them as global variables to be used in the program
    app.locals.covidData = covidData;


    app.listen(port, ()=>{
        console.log("Currently listening to port " + port);
    });

    // console.log(await admin.findOne({}));
});

//connect to the routers
app.use('/admin', admin); // Course APIs
app.use('/covid', data); // User-related APIs



