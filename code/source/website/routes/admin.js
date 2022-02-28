import express from "express";

import {viewAllAdmins, viewAdmin, addAdmin, deleteAdmin, loginAdmin, updateAdmin} from "../controllers/admins/admin.js";

const router = express.Router();

router.get('/viewAllAdmins', viewAllAdmins);
router.get('/viewAdmin/:username', viewAdmin);
router.post('/addAdmin', addAdmin);
router.put('/updateAdmin', updateAdmin);
router.delete('/deleteAdmin/:email', deleteAdmin);
router.post('/login', loginAdmin);

export {router as admin};