import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);

export default router;
