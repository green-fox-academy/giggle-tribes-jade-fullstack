import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, sessionController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);

export default router;
