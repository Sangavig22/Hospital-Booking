import express from 'express';
import saveProfile, { getProfile } from '../controller/profileCotroller.js';

const router = express.Router();

// POST /api/auth/profile -> create or update profile
router.post('/profile', saveProfile);

// GET /api/auth/profile?email=... -> get profile by email
router.get('/profile', getProfile);

export default router;
