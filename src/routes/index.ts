import { Router } from 'express';
import csv from './subroutes/csv/csv';

const router = Router();

router.use('/csv', csv);

export default router;
