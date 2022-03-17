import express from "express";

import {viewAllAdmins, viewAdmin, addAdmin, deleteAdmin, loginAdmin, updateAdmin, adminLogout} from "../controllers/admins/admin.js";
import { authenticateToken } from "../utils/middleware.js";

const router = express.Router();

router.get('/viewAllAdmins', authenticateToken, viewAllAdmins);
router.get('/viewAdmin/:username',authenticateToken, viewAdmin);
router.post('/addAdmin', authenticateToken, addAdmin);
router.put('/updateAdmin', authenticateToken, updateAdmin);
router.delete('/deleteAdmin/:email', authenticateToken, deleteAdmin);
router.post('/login', loginAdmin);
router.post('/logout', adminLogout)

export {router as admin};