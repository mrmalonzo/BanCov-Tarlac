import express from "express";
import { deleteAdmin } from "../controllers/admins/admin.js";
import { changeOverallCovidData, uploadCurrentData, viewAllData, viewCurrentData, viewOverallData } from "../controllers/covidData/covid.js";

const router = express.Router();

router.get('/viewAllData', viewAllData);
router.get('/viewCurrentData', viewCurrentData);
router.get('/viewOverallData', viewOverallData);
router.put('/uploadCurrentData', uploadCurrentData);
router.put('/changeOverallCovidData', changeOverallCovidData);

export {router as data};