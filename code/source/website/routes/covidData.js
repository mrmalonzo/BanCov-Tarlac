import express from "express";
import {authenticateToken} from "../utils/middleware.js"
import { changeOverallCovidData, updateCovidHistory, uploadCurrentData, viewAllData, viewCurrentData, viewOverallData } from "../controllers/covidData/covid.js";

const router = express.Router();

router.get('/viewAllData',  authenticateToken, viewAllData);
router.get('/viewCurrentData', viewCurrentData);
router.get('/viewOverallData',  authenticateToken, viewOverallData);
router.put('/uploadCurrentData', authenticateToken,  uploadCurrentData);
router.put('/changeOverallCovidData',  authenticateToken, changeOverallCovidData);
router.put('/updateCovidHistory',  authenticateToken, updateCovidHistory);

export {router as data};