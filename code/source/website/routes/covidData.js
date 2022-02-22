import express from "express";
import { uploadCurrentData, viewAllData, viewCurrentData, viewOverallData } from "../controllers/covidData/covid.js";

const router = express.Router();

router.get('/viewAllData', viewAllData);
router.get('/viewCurrentData', viewCurrentData);
router.get('/viewOverallData', viewOverallData);
router.put('/uploadCurrentData', uploadCurrentData);

export {router as data};