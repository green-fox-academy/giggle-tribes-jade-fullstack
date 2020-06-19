import express from 'express';
const cors = require('cors');
import { helloController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);

export default router;
