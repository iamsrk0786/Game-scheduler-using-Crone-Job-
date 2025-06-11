import express from 'express';
import { getGamesByDateHandler } from '../Controllers/gameContro.js'; 

const router = express.Router();

router.get('/games', getGamesByDateHandler);

export default router;
